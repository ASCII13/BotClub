<template>
    <div class="wechat-container">
        <list-view :busy="busy" :noMore="noMore" :showHint="showHint" class="article-list">
            <article-item v-for="article in articles" :key="article.id" :item="article"></article-item>
        </list-view>
        <el-card class="account-list" :body-style="{ 'display': 'flex', 'flex-direction': 'column' }">
            <el-link
                class="account"
                v-for="(item, index) in accounts"
                :key="index"
                :underline="false"
                @click="getArticles('init', item.id)">{{ item.name }}
            </el-link>
        </el-card>
    </div>
</template>

<script>
import { getOfficialAccounts, getWechatArticles } from "@/api/wechat.js";

import ListView from '@/components/ListView';
import ArticleItem from '@/components/ArticleItem';

export default {
    data() {
        return {
            accounts: [],
            articles: [],
            currPage: 1,
            busy: false,
            noMore: false,
            showHint: false,
            lastId: -1,

        }
    },
    created() {
        getOfficialAccounts().then(res => {
            if (res.data != undefined && res.data.length != 0) {
                this.accounts = res.data;
                this.setDefaultId(res.data);
                this.getArticles('init', this.lastId);
            } else {
                this.showHint = true;
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
        getArticles(state, currId) {
            if (state === 'init') {
                this.currPage = 1;
                this.noMore = false;

                getWechatArticles(this.currPage, currId).then(res => {
                    if (res.data.datas != undefined && res.data.datas.length != 0) {
                        this.articles = res.data.datas.map(item => {
                            item.loading = false;
                            return item;
                        })
                        this.currPage += 1;
                        this.lastId = currId;
                    } else {
                        this.showHint = true;
                    }
                })
            }
            if (state === 'more') {
                this.busy = true;
                getWechatArticles(this.currPage, currId).then(res => {
                    this.busy = false;
                    if (res.data.datas != undefined && res.data.datas.length != 0) {
                        let tmp = res.data.datas.map(item => {
                            item.loading = false;
                            return item;
                        })
                        this.articles.push(...tmp);
                        this.currPage += 1;
                    } else {
                        this.noMore = true;
                    }
                })
            }
        },
        setDefaultId(arr) {
            for (let index = 0; index < arr.length; index++) {
                if (arr[index].id) {
                    return this.lastId = arr[index].id;
                }
            }
        },
        onScroll() {
            if (this.busy || this.noMore) return;

            let scrollView = document.documentElement || document.body;
            if (scrollView.scrollHeight - scrollView.scrollTop <= scrollView.clientHeight) {
                this.getArticles('more', this.lastId);
            }
        },
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

    .account {
        padding: 10px;
    }
}
</style>