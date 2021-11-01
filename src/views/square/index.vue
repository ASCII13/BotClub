<template>
    <list-view :busy="busy" :no-more="noMore" :show-hint="showHint" :loading="loading" :more="more" style="width: 660px;">
        <article-item v-for="(item, index) in dataList" :key="index" :item="item"></article-item>
    </list-view>
</template>

<script>
import { fetchSquareData } from '@/api/square';
import ListView from '@/components/ListView';
import ArticleItem from '@/components/ArticleItem';
export default {
    components: {
        ListView,
        ArticleItem,
    },
    methods: {
        getSquare(type, pageNum) {
            this.busy = type !== 'init';
            fetchSquareData(pageNum).then(res => {
                const data = res.data;
                const squareList = data.datas;
                
                if (type === 'init') {
                    this.loading = false;
                    if (!data || !squareList || squareList.length === 0) return;

                    this.dataList = squareList.map(item => {
                        item.loading = false;
                        return item;
                    });
                    this.pageNum = ++pageNum;
                } else {
                    if (!data || !squareList || squareList.length === 0) {
                        this.noMore = true;
                    } else {
                        const squares = squareList.map(item => {
                            item.loading = false;
                            return item;
                        });
                        this.dataList.push(...squares);
                        this.pageNum = ++pageNum;
                        this.busy = false;
                    }
                }
            });
        },
        more() {
            this.getSquare('more', this.pageNum);
        },
    },
    computed: {
        showHint() {
            return !this.loading && (!this.dataList || this.dataList.length === 0);
        }
    },
    data() {
        return {
            pageNum: 0,
            busy: false,
            noMore: false,
            loading: true,
            dataList: [],
        }
    },
    created() {
        this.getSquare('init', this.pageNum);
    },
}
</script>