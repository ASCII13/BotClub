<template>
    <div style="display: flex;">
        <list-view style="width: 600px;" :loading="loading">
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
            <div v-for="type in siteList" :key="type.cid" @click="currAnchor = '#id' + type.cid" class="catagroy-item">
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
            loading: true,
            currAnchor: '',
        }
    },
    created() {
        getSiteList().then(res => {
            this.loading = false;

            const datas = res.data;
            if (!datas || datas.length === 0) return;

            this.siteList = datas.filter(item => item.articles.length > 0);
        });
    },
    // methods: {
    //     scrollIntoElem(id) {
    //         const view = document.querySelector('#id'+id);
    //         if (view) {
    //             console.log(view);
    //             view.style.border = '1px solid red';
    //             view.scrollIntoView();
    //         }
    //     }
    // },
    components: {
        ListView,
        ExLink,
    },
    watch: {
        currAnchor(newVal, oldVal) {
            if (oldVal) {
                const pre = document.querySelector(oldVal);
                pre.classList.toggle('anchor');
            }
            const next = document.querySelector(newVal);
            next.classList.toggle('anchor');
            next.scrollIntoView();
        }
    }
}
</script>

<style lang="scss" scoped>
.type-item:not(:last-child) {
    margin-bottom: 6px;
}
.item-list {
    display: flex;
    flex-wrap: wrap;
}
.catagroies {
    width: 200px;
    height: 500px;
    overflow: auto;
    margin-left: 0.6rem;
    &:hover {
        cursor: pointer;
    }
    .catagroy-item {
        margin: 8px 0;
        text-align: center;
    }
}
.item {
    padding: 10px;
}
.anchor {
    border-color: $primaryColor;
}
</style>