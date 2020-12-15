<template>
    <div class="knowledge-container">
        <list-view class="article-list" :showHint="showHint" :noMore="noMore" :busy="busy" :loading="showListLoading">
            <article-item v-for="(articleItem, index) in articles" :key="index" :item="articleItem"></article-item>
        </list-view>
        <el-card :body-style="{ 'width': '200px', }" style="height: fit-content; margin-left: 0.6rem;" v-loading="showTypeLoading">
            <div slot="header">体系分类</div>
            <div class="knowledge-list">
                <el-popover placement="right" trigger="hover" v-for="(item, index) in knowledgeDatas" :key="index">
                    <div slot="reference" class="knowledge-item">{{ item.name }}</div>
                    <div v-for="(secItem, secIndex) in item.children"
                        :key="secIndex"
                        class="sec-item"
                        @click="getArticles(secItem.id)">{{ secItem.name }}
                    </div>
                </el-popover>
            </div>
        </el-card>
    </div>
</template>

<script>
import { getKnowledgeSystemData, getArticles } from '@/api/knowledge';
import ListView from '@/components/ListView';
import ArticleItem from '@/components/ArticleItem';

export default {
    data() {
        return {
            knowledgeDatas: [],
            articles: [],
            currpage: 0,
            showHint: false,
            noMore: false,
            busy: false,
            lastId: -1,
            showListLoading: true,
            showTypeLoading: true,
        }
    },
    created() {
        getKnowledgeSystemData().then(res => {
            this.showTypeLoading = false;
            let knowledgeList = res.data;
            if (knowledgeList && knowledgeList.length != 0) {
                this.knowledgeDatas = knowledgeList.filter(item => {
                    if (item.children && item.children.length != 0) {
                        return item;
                    }
                });
                this.setDefaultId(this.knowledgeDatas);
                this.getArticleList('init', this.lastId);
            }
        })
    },
    mounted() {
        document.addEventListener('scroll', this.onScroll);
    },
    destroyed() {
        document.removeEventListener('scroll', this.onScroll);
    },
    components: {
        ListView,
        ArticleItem,
    },
    methods: {
        getArticles(currId) {
            if (this.lastId === currId) return;
            this.getArticleList('init', currId);
        },
        getArticleList(state, currId) {
            let params = { cid: currId };

            if (state === 'init') {
                this.currpage = 0;
                this.noMore = false;
                
                getArticles(this.currpage, params).then(res => {
                    this.showListLoading = false;
                    if (res.data.datas && res.data.datas.length != 0) {
                        this.articles = res.data.datas.map(item => {
                            item.loading = false;
                            return item;
                        })
                        this.currpage += 1;
                        this.lastId = currId;
                    } else {
                        this.showHint = true;
                    }
                })
            }
            if (state === 'more') {
                this.busy = true;
                getArticles(this.currpage, params).then(res => {
                    this.busy = false;
                    if (res.data.datas && res.data.datas.length != 0) {
                        this.articles.push(...res.data.datas);
                        this.currpage += 1;
                    } else {
                        this.noMore = true;
                    }
                })
            }
        },
        onScroll() {
            if (this.busy || this.noMore) return;

            let scrollView = document.documentElement || document.body;
            if (scrollView.scrollHeight - scrollView.scrollTop <= scrollView.clientHeight) {
                this.getArticleList('more', this.lastId);
            }
        },
        setDefaultId(arr) {
            for (let index = 0; index < arr.length; index++) {
                if (arr[index].children.length != 0) {
                    return this.lastId = arr[index].children[0].id;
                }
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.knowledge-container {
    display: flex;
}

.article-list {
    width: 600px;
}

.knowledge-list {
    height: 400px;
    overflow: auto;
}

.knowledge-item {
    font-size: 14px;
    font-weight: 500;
}

.sec-item:hover,
.knowledge-item:hover {
    background-color: #e3e3e5;
}

.sec-item,
.knowledge-item {
    padding: 10px;
    text-align: center;
}

.sec-item {
    width: 150px;
}
</style>