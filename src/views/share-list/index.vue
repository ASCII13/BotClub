<template>
    <list-view :showHint="showHint" :noMore="noMore" :busy="busy" :loading="loading" :more="more" :placeholder="placeholder" style="width: 660px;">
        <el-card v-for="(item, index) in dataList" :key="item.id" class="share-item">
            <el-link :href="item.link" :underline="false" target="_blank" class="title">{{ item.title }}</el-link>
            <div class="info">
                <div class="date">{{ item.niceDate }}</div>
                <el-popover width="200" placement="right" v-model="item.visible">
                    <div slot="reference"><i class="el-icon-delete-solid"></i></div>
                    <div style="text-align: center;">确定删除该分享内容？</div>
                    <div style="display: flex; justify-content: center; margin-top: 10px;">
                        <el-button size="mini" style="width: 70px;" @click="item.visible = false">取消</el-button>
                        <el-button type="primary" size="mini" style="width: 70px;" :loading="item.loading" @click="remove(index)">确定</el-button>
                    </div>
                </el-popover>
            </div>
        </el-card>
    </list-view>
</template>

<script>
import ListView from '@/components/ListView';
import { getSelfShareData, delSelfShareData } from '@/api/sharer';

export default {
    components: {
        ListView,
    },
    watch: {
        dataList(val) {
            if (val.length === 0) {
                this.showHint = true;
            }
        }
    },
    methods: {
        more() {
            this.getList('more', this.page);
        },
        getList(type, currPage) {
            if (type === 'init') {
                getSelfShareData().then(res => {
                    this.loading = false;
                    if (res.data.shareArticles.datas.length > 0) {
                        this.page += 1;
                        this.dataList = res.data.shareArticles.datas.map(item => {
                            item.visible = false;
                            item.loading = false;
                            return item;
                        })
                    } else {
                        this.showHint = true;
                    }
                })
            }
            if (type === 'more') {
                this.busy = true;
                getSelfShareData(currPage).then(res => {
                    this.busy = false;
                    if (res.data.shareArticles.datas.length > 0) {
                        this.page += 1;
                        let tmp = res.data.shareArticles.datas.map(item => {
                            item.visible = false;
                            item.loading = false;
                            return item;
                        });
                        this.dataList.push(...tmp);
                    } else {
                        this.noMore = true;
                    }
                })
            }
        },
        remove(index) {
            let item = this.dataList[index];
            item.loading = true;

            delSelfShareData(item.id).then(() => {
                this.dataList.splice(index, 1);
            }).catch(() => {
                item.loading = false;
            })
        }
    },
    data() {
        return {
            showHint: false,
            noMore: false,
            busy: false,
            loading: true,
            page: 1,
            dataList: [],
            placeholder: '暂无分享内容'
        }
    },
    created() {
        this.getList('init');
    }
}
</script>

<style lang="scss" scoped>
.share-item {
    padding: 10px;

    &:not(:first-child) {
        margin-top: 6px;
    }
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
</style>