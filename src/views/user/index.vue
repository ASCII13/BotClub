<template>
    <div style="width: 600px;">
        <div class="info">
            <avatar :name="userInfo.nickname"></avatar>
            <div>
                <span>积分: {{ userInfo.coinCount }}</span>
                <span>等级: {{ userInfo.level }}</span>
                <span>排名: {{ userInfo.rank }}</span>
            </div>
        </div>
        <list-view :loading="loading" :show-hint="showHint" :busy="busy" :no-more="noMore" :more="more">
            <article-item v-for="(item, index) in dataList" :key="index" :item="item"></article-item>
        </list-view>
    </div>
</template>

<script>
import { fetchData } from "@/api/sharer";
import Avatar from '@/components/Avatar';
import ListView from '@/components/ListView';
import ArticleItem from '@/components/ArticleItem';

export default {
    components: {
        Avatar,
        ListView,
        ArticleItem,
    },
    computed: {
        showHint() {
            return !this.loading &&
                (!this.dataList || this.dataList.length === 0);
        },
    },
    methods: {
        getUserData(type, page) {
            this.busy = type !== 'init';
            fetchData(this.userId, page).then(res => {
                this.loading = false;
                if (res.data) {
                    const {coinInfo, shareArticles} = res.data;
                    const dataList = shareArticles.datas;

                    if (coinInfo) {
                        this.userInfo = coinInfo;
                    }
                    if (shareArticles && dataList && dataList.length > 0) {
                        const tmp = dataList.map(a => {
                            a.loading = false;
                            return a;
                        });

                        if (type === 'init') {
                            this.dataList = tmp;
                        } else {
                            this.busy = false;
                            this.dataList.push(...tmp);
                        }
                        this.pageNum = ++page;
                    } else {
                        if (type !== 'init') {
                            this.noMore = true;
                        }
                    }
                }
            });
        },
        more() {
            this.getUserData('more', this.pageNum);
        },
    },
    data() {
        return {
            pageNum: 1,
            userInfo: {
                nickname: '-',
                coinCount: '-',
                level: '-',
                rank: '-'
            },
            dataList: [],
            loading: true,
            busy: false,
            noMore: false,
            userId: this.$route.query.id,
        }
    },
    created() {
        this.getUserData('init', this.pageNum);
    },
}
</script>

<style lang="scss" scoped>
$distance: 0.5rem;

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
.dark-mode {
    .info {
        color: $textColorDark;
        background-color: $elementBgDark;
    }
}
</style>