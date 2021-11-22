<template>
    <list-view :show-hint="showHint" :no-more="noMore" :busy="busy" :loading="loading" :more="more" :placeholder="'暂无分享内容'" style="width: 660px;">
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
import { fetchSelfShareData, delSelfShareData } from '@/api/sharer';

export default {
    components: {
        ListView,
    },
    computed: {
        showHint() {
            return !this.loading &&
                (!this.dataList || this.dataList.length === 0);
        }
    },
    methods: {
        getShareList(type, pageNum) {
            this.busy = type !== 'init';
            fetchSelfShareData(pageNum).then(res => {
                this.loading = false;

                const data = res.data;
                const articleData = data.shareArticles;
                const articles = articleData.datas;

                if (data && articleData && articles && articles.length > 0) {
                    const tmp = articles.map(a => {
                        a.visible = false;
                        a.loading = false;
                        return a;
                    });
                    if (type === 'init') {
                        this.dataList = tmp;
                    } else {
                        this.busy = false;
                        this.dataList.push(...tmp);
                    }
                    this.pageNum = ++pageNum;
                } else {
                    if (type !== 'init') {
                        this.busy = false;
                        this.noMore = true;
                    }
                }
            });
        },
        more() {
            this.getShareList('more', this.pageNum);
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
            noMore: false,
            busy: false,
            loading: true,
            pageNum: 1,
            dataList: [],
        }
    },
    created() {
        this.getShareList('init', this.pageNum);
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