<template>
    <div class="site-container">
        <div>
            <el-card v-for="type in siteList" :key="type.cid" :id="'id'+type.cid" class="site-list">
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
        </div>
        <el-card class="site-type" :body-style="{ 'display': 'flex', 'flex-direction': 'column',}">
            <el-link
                class="item"
                v-for="type in siteList"
                :key="type.cid"
                :underline="false"
                @click="scrollIntoElem(type.cid)">{{ type.name }}
            </el-link>
        </el-card>
    </div>
</template>

<script>
import { getSiteList } from '@/api/sites';

export default {
    data() {
        return {
            siteList: [],
        }
    },
    created() {
        getSiteList().then(res => {
            let datas = res.data;
            if (datas && datas.length != 0) {
                this.siteList = datas;
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
    }
}
</script>

<style lang="scss" scoped>
.site-container {
    display: flex;

    .site-list {
        width: 600px;

        .item-list {
            display: flex;
            flex-wrap: wrap;
        }
    }

    .site-type {
        width: 200px;
        height: 500px;
        overflow: auto;
        margin-left: 0.6rem;
    }

    .item {
        padding: 10px;
    }

    .site-list:not(:last-child) {
        margin-bottom: 6px;
    }
}
</style>