<template>
    <list-view :busy="busy" :noMore="noMore" :showHint="showHint" style="width: 660px;">
        <el-card v-for="(item, index) in favoriteList" :key="item.id" class="favorite-item">
            <el-link :href="item.link" :underline="false" target="_blank" class="title">{{ item.title }}</el-link>
            <div class="info">
                <div class="date">{{ item.niceDate }}</div>
                <el-popover width="200" placement="right" v-model="item.visible">
                    <div slot="reference"><i class="el-icon-star-on"></i></div>
                    <div style="text-align: center;">确定取消收藏该内容？</div>
                    <div style="display: flex; justify-content: center; margin-top: 10px;">
                        <el-button size="mini" style="width: 70px;" @click="item.visible = false">取消</el-button>
                        <el-button type="primary" size="mini" style="width: 70px;" :loading="item.loading" @click="unstar(index)">确定</el-button>
                    </div>
                </el-popover>
            </div>
        </el-card>
    </list-view>
</template>

<script>
import { getFavoriteList, uncollect } from '@/api/favorite';
import ListView from '@/components/ListView';

export default {
    data() {
        return {
            busy: false,
            noMore: false,
            showHint: false,
            currPage: 0,
            favoriteList: [],
        }
    },
    created() {
        this.getFavoriteData('init');
    },
    mounted() {
        document.addEventListener('scroll', this.onScroll);
    },
    destroyed() {
        document.removeEventListener('scroll', this.onScroll);
    },
    components: {
        ListView,
    },
    methods: {
        onScroll() {
            if (this.busy || this.noMore) return;

            let scrollView = document.documentElement || document.body;
            if (scrollView.scrollHeight - scrollView.scrollTop <= scrollView.clientHeight) {
                this.getFavoriteData('more', this.currPage);
            }
        },
        unstar(currIndex) {
            let currItem = this.favoriteList[currIndex];
            currItem.loading = true;

            uncollect(currItem.id, currItem.originId).then(() => {
                this.favoriteList.splice(currIndex, 1);
            }).catch(() => {
                currItem.loading = false;
            })
        },
        getFavoriteData(state) {
            if (state === 'init') {
                getFavoriteList().then(res => {
                    if (res.data.datas != undefined && res.data.datas.length != 0) {
                        this.currPage += 1;
                        this.favoriteList = res.data.datas.map(item => {
                            item.visible = false;
                            item.loading = false;
                            return item;
                        })
                    } else {
                        this.showHint = true;
                    }
                })
            }
            if (state === 'more') {
                this.busy = true;
                getFavoriteList(this.currPage).then(res => {
                    this.busy = false;
                    if (res.data.datas != undefined && res.data.datas.length != 0) {
                        let tmp = res.data.datas.map(item => {
                            item.visible = false;
                            item.loading = false;
                            return item;
                        })
                        this.currPage += 1;
                        this.favoriteList.push(...tmp);
                    } else {
                        this.noMore = true;
                    }
                })
            }
        } 
    }
}
</script>

<style lang="scss" scoped>
.favorite-item {
    padding: 10px;
    margin-top: 6px;
}

.title {
    color: #303133;
    line-height: 26px;
    font-size: 18px;
    font-weight: 500;
}

.info {
    margin-top: 1rem;
    display: flex;
    align-items: center;

    .date {
        color: #909399;
        font-size: 13px;
    }

    & > :last-child {
        margin-left: auto;
    }
}

.el-icon-star-on {
    font-size: 26px;
    color: #59a57c;
}
</style>