<template>
    <div class="site-container">
        <list-view class="site-list" :loading="loading">
            <el-card v-for="type in siteList" :key="type.cid" :id="'id'+type.cid" class="type-item">
                <div slot="header">{{ type.name }}</div>
                <div class="item-list">
                    <el-link
                        class="item"
                        v-for="item in type.articles" 
                        :key="item.id"
                        :href="item.link"
                        :underline="false"
                        target="_blank">{{ item.title }}
                    </el-link>
                </div>
            </el-card>
        </list-view>
        <el-card class="catagroies" v-loading="loading" :body-style="{ 'display': 'flex', 'flex-direction': 'column',}">
            <div v-for="type in siteList" :key="type.cid" @click="scrollIntoElem(type.cid)" class="catagroy-item">
                <ex-link>{{ type.name }}</ex-link>
            </div>
        </el-card>
    </div>
</template>

<script>
import ExLink from '@/components/ExLink';
import ListView from '@/components/ListView';
import { getSiteList } from '@/api/sites';

export default {
    data() {
        return {
            siteList: [],
            loading: false,
        }
    },
    created() {
        this.loading = true;
        getSiteList().then(res => {
            this.loading = false;
            let datas = res.data;
            if (datas && datas.length != 0) {
                this.siteList = datas.filter(item => {
                    return item.articles.length > 0;
                });
            }
        })
    },
    methods: {
        scrollIntoElem(id) {
            const view = document.querySelector('#id'+id);
            if (view) {
                view.scrollIntoView();
            }
        }
    },
    components: {
        ListView,
        ExLink,
    }
}
</script>

<style lang="scss" scoped>
.site-container {
    display: flex;

    .site-list {
        width: 600px;

        .type-item:not(:last-child) {
            margin-bottom: 6px;
        }

        .item-list {
            display: flex;
            flex-wrap: wrap;
        }
    }

    .catagroies {
        width: 200px;
        height: 500px;
        overflow: auto;
        margin-left: 0.6rem;

        .catagroy-item {
            margin: 8px 0;
            text-align: center;
        }
    }

    .item {
        padding: 10px;
    }
}
</style>