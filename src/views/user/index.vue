<template>
    <div class="user">
        <list-view :showHint="userId < 0">
            <div class="info">
                <el-avatar style="background-color: #59a57c;">{{ getFirstChar(userInfo.username) }}</el-avatar>
                <div>
                    <span>积分：{{ userInfo.coinCount }}</span>
                    <span>等级：{{ userInfo.level }}</span>
                    <span>排名：{{ userInfo.rank }}</span>
                </div>
            </div>
            <list-view :loading="loading" :showHint="showHint" :busy="busy" :noMore="noMore" :more="more">
                <article-item v-for="(item, index) in dataList" :key="index" :item="item"></article-item>
            </list-view>
        </list-view>
    </div>
</template>

<script>
import ListView from '@/components/ListView';
import ArticleItem from '@/components/ArticleItem';
import { getData } from "@/api/sharer";
import { getFirstChar } from '@/utils/text';

export default {
    components: {
        ListView,
        ArticleItem,
    },
    methods: {
        getFirstChar,
        getUserData(type, currPage) {
            if (type === 'init') {
                getData(this.userId).then(res => {
                    this.loading = false;
                    if (res.data !== undefined) {
                        this.userInfo = res.data.coinInfo;

                        let data = res.data.shareArticles;
                        if (data.datas.length > 0) {
                            this.dataList = data.datas;
                            this.page += 1;
                        } else {
                            this.showHint = true;
                        }
                    } else {
                        this.showHint = true;
                    }
                });
            }
            if (type === 'more') {
                this.busy = true;
                getData(this.userId, currPage).then(res => {
                    this.busy = false;
                    
                    let list = res.data.shareArticles.datas;
                    if (list.length > 0) {
                        this.dataList.push(...list);
                        this.page += 1;
                    } else {
                        this.noMore = true;
                    }
                })
            }
        },
        more() {
            this.getUserData('more', this.page);
        },
    },
    data() {
        return {
            page: 1,
            userInfo: {
                username: '-',
                coinCount: '-',
                level: '-',
                rank: '-'
            },
            dataList: [],
            loading: true,
            showHint: false,
            busy: false,
            noMore: false,
            userId: this.$route.query.id,
        }
    },
    created() {
        this.getUserData('init');
    },
}
</script>

<style lang="scss" scoped>
$distance: 0.5rem;

.user {
    width: 660px;
}

.info {
    margin-bottom: $distance;
    height: 6rem;
    background-color: #f4f5f7;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & > div {
        margin-top: $distance;
        font-size: 13px;
    }

    & span:not(:last-child) {
        margin-right: $distance;
    }
}
</style>