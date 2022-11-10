<template>
    <div class="wechat-container">
        <list-view :busy="busy" :no-more="noMore" :show-hint="showHint" :loading="showListLoading" :more="more" class="article-list">
            <article-item v-for="article in articles" :key="article.id" :item="article"></article-item>
        </list-view>
        <el-card
            class="account-list"
            :body-style="{ 'display': 'flex', 'flex-direction': 'column' }"
            v-loading="showTypeLoading">
            <div v-for="(item, index) in accounts" :key="index" class="account" @click="id = item.id">
                <ex-link>{{ item.name }}</ex-link>
            </div>
        </el-card>
    </div>
</template>

<script>
import ExLink from '@/components/ExLink';
import ListView from '@/components/ListView';
import ArticleItem from '@/components/ArticleItem';
import { fetchOfficialAccounts, fetchWechatArticles } from "@/api/wechat";

export default {
    data() {
        return {
            accounts: [],
            articles: [],
            pageNum: 1,
            busy: false,
            noMore: false,
            id: -1,
            showListLoading: true,
            showTypeLoading: true,
        }
    },
    created() {
        fetchOfficialAccounts().then(res => {
            this.showTypeLoading = false;

            const accounts = res.data;
            if (!accounts || accounts.length === 0) return;

            this.accounts = accounts;
            this.setDefaultId(accounts);
        });
    },
    components: {
        ListView,
        ArticleItem,
        ExLink,
    },
    methods: {
        setDefaultId(arr) {
            for (let index = 0; index < arr.length; index++) {
                if (arr[index].id) {
                    return this.id = arr[index].id;
                }
            }
        },
        more() {
            this.busy = true;
            fetchWechatArticles(this.pageNum, this.id).then(res => {
                this.busy = false;

                const data = res.data;
                if (data && data.datas &&  data.datas.length > 0) {
                    const articles = data.datas.map(a => {
                        a.loading = false;
                        return a;
                    });
                    this.articles.push(...articles);
                    this.pageNum++;
                } else {
                    this.showHint = true;
                }
            });
        },
    },
    computed: {
        showHint() {
            return !this.showListLoading &&
                (!this.articles || this.articles.length === 0);
        }
    },
    watch: {
        id(newVal, oldVal) {
            if (newVal === oldVal) return;

            this.articles = [];
            this.showListLoading = true;

            fetchWechatArticles(1, this.id).then(res => {
                this.showListLoading = false;

                const data = res.data;
                const acticles = data.datas;
                if (!data || !acticles || acticles.length === 0) return;

                this.articles = acticles.map(a => {
                    a.loading = false;
                    return a;
                });
                this.pageNum = 2;
                this.id = newVal;
                this.noMore = false;
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.wechat-container {
    display: flex;
}
.article-list {
    width: 600px;
}
.account-list {
    width: 200px;
    height: 500px;
    overflow: auto;
    margin-left: 0.6rem;
    &:hover {
        cursor: pointer;
    }
    .account {
        padding: 10px;
        text-align: center;
    }
}
</style>