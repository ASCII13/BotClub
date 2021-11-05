<template>
    <div class="knowledge-container">
        <list-view :show-hint="showHint" :no-more="noMore" :busy="busy" :loading="showListLoading" :more="more" style=" width: 600px;">
            <article-item v-for="(articleItem, index) in articles" :key="index" :item="articleItem"></article-item>
        </list-view>
        <el-card :body-style="{ 'width': '200px', }" style="height: fit-content; margin-left: 0.6rem;" v-loading="showTypeLoading">
            <div slot="header">体系分类</div>
            <div class="knowledge-list">
                <el-popover placement="right" trigger="hover" v-for="(item, index) in knowledgeData" :key="index">
                    <div slot="reference" class="knowledge-item">{{ item.name }}</div>
                    <div v-for="(secItem, secIndex) in item.children"
                        :key="secIndex"
                        class="sec-item"
                        @click="cid = secItem.id">{{ secItem.name }}
                    </div>
                </el-popover>
            </div>
        </el-card>
    </div>
</template>

<script>
import ListView from '@/components/ListView';
import ArticleItem from '@/components/ArticleItem';
import { fetchKnowledgeData, fetchArticles } from '@/api/knowledge';
export default {
    data() {
        return {
            knowledgeData: [],
            articles: [],
            pageNum: 0,
            noMore: false,
            busy: false,
            cid: -1,
            showListLoading: true,
            showTypeLoading: true,
        }
    },
    created() {
        fetchKnowledgeData().then(res => {
            this.showTypeLoading = false;

            const knowledgeList = res.data;
            if (knowledgeList && knowledgeList.length > 0) {
                this.knowledgeData = knowledgeList.filter(k => {
                    if (k.children && k.children.length > 0) {
                        return k;
                    }
                });
                this.setDefaultId(this.knowledgeData);
            }
        });
    },
    components: {
        ListView,
        ArticleItem,
    },
    methods: {
        more() {
            this.busy = true;
            fetchArticles(this.pageNum, {cid: this.cid}).then(res => {
                const data = res.data;
                const datas = data.datas;
                if (!data || !datas || datas.length === 0) {
                    this.noMore = true;
                } else {
                    const articles = datas.map(a => {
                        a.loading = false;
                        return a;
                    });
                    this.articles.push(...articles);
                    this.pageNum++;
                }
                this.busy = false;
            });
        },
        setDefaultId(arr) {
            for (let index = 0; index < arr.length; index++) {
                if (arr[index].children.length > 0) {
                    return this.cid = arr[index].children[0].id;
                }
            }
        }
    },
    computed: {
        showHint() {
            return !this.showListLoading &&
                (!this.articles || this.articles.length === 0);
        }
    },
    watch: {
        cid(newVal, oldVal) {
            if (newVal === oldVal) return;

            fetchArticles(0, {cid: newVal}).then(res => {
                this.showListLoading = false;

                const data = res.data;
                const datas = data.datas;
                if (!data || !datas || datas.length === 0) return;

                this.articles = datas.map(a => {
                    a.loading = false;
                    return a;
                });
                this.pageNum = 1;
                this.noMore = false;
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.knowledge-container {
    display: flex;
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