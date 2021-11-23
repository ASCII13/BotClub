<template>
    <list-view :busy="busy" :no-more="noMore" :show-hint="showHint" :more="more" :loading="loading" style="width: 660px;">
        <article-item v-for="(result, index) in results" :key="index" :item="result"></article-item>
    </list-view>
</template>

<script>
import { mapGetters } from 'vuex';
import { search } from '@/api/search';
import ListView from '@/components/ListView';
import ArticleItem from '@/components/ArticleItem';

export default {
    components: {
        ListView,
        ArticleItem,
    },
    methods: {
        more() {
            this.busy = true;
            search(this.keywords, this.pageNum).then(res => {
                this.busy = false;
                const data = res.data;
                const results = data.datas;

                if (data && results && results.length > 0) {
                    const tmp = results.map(result => {
                        result.loading = false;
                        return result;
                    });
                    this.results.push(...tmp);
                    this.pageNum++;
                } else {
                    this.noMore = true;
                }
            });
        }
    },
    computed: {
        ...mapGetters([
            'keywords',
        ]),
        showHint() {
            return !this.loading &&
                (!this.results || this.results.length === 0);
        }
    },
    watch: {
        keywords: {
            immediate: true,
            handler(val, oldVal) {
                if (val === oldVal || val === '' || val === ' ') return;

                this.results = [];
                this.loading = true;
                
                search(val).then(res => {
                    this.loading = false;
                    const data = res.data;
                    const results = data.datas;

                    if (!data || !results || results.length === 0) return;

                    this.results = results.map(result => {
                        result.loading = false;
                        return result;
                    });
                    this.pageNum = 1;
                });
            }
        }
    },
    data() {
        return {
            busy: false,
            noMore: false,
            loading: true,
            pageNum: 0,
            results: [],
        }
    }
}
</script>

