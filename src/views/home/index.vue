<template>
    <div class="home-container">
        <div class="left-container">
            <el-carousel loop autoplay arrow="hover" height="330px" class="banner-container">
                <el-carousel-item v-for="(item, index) in bannerList" :key="index" :name="item.title">
                    <el-image :src="item.imagePath" fit="fill" style="width: 100%; height: 100%;"></el-image>
                </el-carousel-item>
            </el-carousel>
            <list-view :busy="busy" :noMore="noMore" :showHint="showHint" class="article-container">
                <article-item v-for="(item, index) in articleList" :key="index" :item="item"></article-item>
            </list-view>
        </div>
        <div class="right-container">
            <side-bar></side-bar>
        </div>
    </div>
</template>

<script>
import SideBar from './components/SideBar';
import ListView from '@/components/ListView';
import ArticleItem from '@/components/ArticleItem';

import { getBanner, getArticles } from '@/api/home';

export default {
    data() {
        return {
            currPage: 0,
            busy: false,
            noMore: false,
            showHint: false,
            bannerList: [],
            articleList: [],
        }
    },
    created() {
        getBanner().then(res => {
            this.bannerList = res.data
        }),
        this.getArticleList('init')
    },
    mounted() {
        document.addEventListener('scroll', this.onScroll);
    },
    destroyed() {
        document.removeEventListener('scroll', this.onScroll);
    },
    components: {
        SideBar,
        ListView,
        ArticleItem,
    },
    methods: {
        getArticleList(state) {
            switch (state) {
                case 'init':
                    getArticles(0).then(res => {
                        let dataList = res.data.datas;
                        if (dataList != undefined && dataList.length != 0) {
                            this.currPage += 1;
                            this.articleList = dataList.map(item => {
                                item.loading = false;
                                return item;
                            });
                        } else {
                            this.showHint = true;
                        }
                    })
                    break;

                case 'more':
                    this.busy = true;
                    getArticles(this.currPage).then(res => {
                        this.busy = false;
                        let dataList = res.data.datas;
                        if (dataList != undefined && dataList.length != 0) {
                            this.currPage += 1;
                            let tmp = dataList.map(item => {
                                item.loading = false;
                                return item;
                            });
                            this.articleList.push(...tmp);
                        } else {
                            this.noMore = true;
                        }
                    })
                    break;
            }
        },
        /**
         * scrollHeight 总的可滚动高度
         * scrollTop 已滚动的高度
         * clientHeight 可视区域高度
         */
        onScroll() {
            if (this.busy || this.noMore) return;
            
            let scrollView = document.documentElement || document.body;
            if (scrollView.scrollHeight - scrollView.scrollTop <= scrollView.clientHeight) {
                this.getArticleList('more');
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.home-container {
    display: flex;

    .left-container {
        width: 600px;
        display: flex;
        flex-direction: column;

        .banner-container {
            border-radius: 5px;
        }

        .article-container {
            margin-top: 6px;
        }
    }

    .right-container {
        height: fit-content;
        margin-left: 0.6rem;
    }
}
</style>