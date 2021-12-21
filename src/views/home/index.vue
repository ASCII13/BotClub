<template>
    <div class="content">
        <el-carousel loop autoplay arrow="hover" height="330px" class="banner">
            <el-carousel-item v-for="(item, index) in bannerList" :key="index" :name="item.title">
                <el-image :src="item.imagePath" fit="fill" style="width: 100%; height: 100%;"></el-image>
            </el-carousel-item>
        </el-carousel>
        <list-view :busy="busy" :no-more="noMore" :show-hint="showHint" :loading="loading" :more="more" class="articles">
            <article-item v-for="item in articleList" :key="item.id" :item="item"></article-item>
        </list-view>
    </div>
</template>

<script>
import ListView from '@/components/ListView';
import ArticleItem from '@/components/ArticleItem';
import { getBanner, fetchArticles, fetchTopArticles } from '@/api/home';
export default {
    data() {
        return {
            pageNum: 0,
            busy: false,
            noMore: false,
            loading: true,
            bannerList: [],
            articleList: [],
        }
    },
    created() {
        getBanner().then(res => this.bannerList = res.data);
        this.getListData();
    },
    components: {
        ListView,
        ArticleItem,
    },
    methods: {
        getListData() {
            Promise.all([fetchTopArticles(), fetchArticles()]).then(res => {
                const topArticles = res[0].data;
                const articleData = res[1].data;
                const articles = articleData.datas;

                let topList = [];
                let articleList = [];

                if (topArticles && topArticles.length > 0) {
                    topList = topArticles.map(top => {
                        top.top = true;
                        top.loading = false;
                        return top;
                    });
                }
                if (articleData && articles && articles.length > 0) {
                    articleList =  articles.map(article => {
                        article.loading = false;
                        return article;
                    });
                }
                if (articleList.length > 0) {
                    this.pageNum++;
                }
                this.articleList.push(...topList, ...articleList);
                this.loading = false;
            });
        },
        more() {
            this.busy = true;
            fetchArticles(this.pageNum).then(res => {
                const data = res.data;
                const articles = data.datas;
                if (!data || !articles || articles.length === 0) {
                    this.noMore = true;
                } else {
                    const articleList = articles.map(article => {
                        article.loading = false;
                        return article;
                    });
                    this.articleList.push(...articleList);
                    this.busy = false;
                    this.pageNum++;
                }
            });
        }
    },
    computed: {
        showHint() {
            return !this.loading && (!this.articleList || this.articleList.length === 0);
        }
    }
}
</script>

<style lang="scss" scoped>
.content {
    width: 600px;
    display: flex;
    flex-direction: column;
    .banner {
        border-radius: 5px;
    }
    .articles {
        margin-top: 6px;
    }
}
</style>