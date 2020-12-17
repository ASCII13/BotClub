<template>
    <list-view :busy="busy" :noMore="noMore" :showHint="showHint" :loading="loading" :more="more" class="square-container">
        <article-item v-for="(item, index) in dataList" :key="index" :item="item"></article-item>
    </list-view>
</template>

<script>
import { getSquareData } from '@/api/square';

import ListView from '@/components/ListView';
import ArticleItem from '@/components/ArticleItem';

export default {
    components: {
        ListView,
        ArticleItem,
    },
    methods: {
        getSquareContent(state) {
            if (state === 'init') {
                this.loading = true;
                getSquareData().then(res => {
                    this.loading = false;
                    let datas = res.data.datas;
                    if (datas && datas.length != 0) {
                        this.currPage += 1;
                        this.dataList = datas.map(item => {
                            item.loading = false;
                            return item;
                        }) 
                    } else {
                        this.showHint = true;
                    }
                }) 
            }
            if (state === 'more') {
                this.busy = true;
                getSquareData(this.currPage).then(res => {
                    this.busy = false;
                    let datas = res.data.datas;
                    if (datas && datas.length != 0) {
                        this.currPage += 1;
                        let tmp = datas.map(item => {
                            item.loading = false;
                            return item;
                        });
                        this.dataList.push(...tmp);
                    } else {
                        this.noMore = true;
                    }
                })
            }
        },
        more() {
            this.getSquareContent('more');
        },
    },
    data() {
        return {
            currPage: 0,
            busy: false,
            noMore: false,
            showHint: false,
            loading: false,
            dataList: [],
        }
    },
    created() {
        this.getSquareContent('init');
    },
}
</script>

<style lang="scss" scoped>
.square-container {
    width: 660px;
}
</style>