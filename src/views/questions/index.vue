<template>
    <list-view :busy="busy" :noMore="noMore" :showHint="showHint" :loading="loading" class="question-list">
        <el-card
            class="question-item"
            v-for="(item, index) in datas"
            :key="index"
            :body-style="{ 'display': 'flex', 'flex-direction': 'column', 'padding': '15px' }">
            <div class="date-info">{{ item.niceDate }}</div>
            <el-link :href="item.link" :underline="false" target="_blank" class="title">{{ item.title }}</el-link>
            <div class="collection-container">
                <div v-for="(tag, tagIndex) in item.tags" :key="tagIndex" class="tag">#{{ tag.name }}</div>
                <el-button
                    size="mini"
                    style="width: 80px;"
                    :loading="item.loading"
                    :type="item.collect ? 'primary' : 'info'"
                    @click="changeCollectionStatus(item)">{{ item.collect ? '已收藏' : '收藏'}}
                </el-button>
            </div>
        </el-card>
    </list-view>
</template>

<script>
import { getQuestions } from '@/api/question';
import { collectArticle, uncollectArticle } from '@/api/collection';
import ListView from '@/components/ListView';

export default {
    components: {
        ListView,
    },
    methods: {
        onScroll() {
            if (this.busy) return;

            let scrollView = document.documentElement || document.body;
            if (scrollView.scrollHeight - scrollView.scrollTop <= scrollView.clientHeight) {
                this.getQuestionData('more');
            }
        },
        getQuestionData(state) {
            this.loading = true;
            if (state === 'init') {
                getQuestions().then(res => {
                    this.loading = false;
                    let questions = res.data.datas;
                    if (questions && questions.length != 0) {
                        this.currpage += 1;
                        this.datas = questions.map(item => {
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
                getQuestions(this.currpage).then(res => {
                    this.busy = false;
                    let questions = res.data.datas;
                    if (questions && questions.length != 0) {
                        this.currpage += 1;
                        let tmp = questions.map(item => {
                            item.loading = false;
                            return item;
                        })
                        this.datas.push(...tmp);
                    } else {
                        this.noMore = true;
                    }
                })    
            }
        },
        changeCollectionStatus(item) {
            item.loading = true;

            if (item.collect) {
                uncollectArticle(item.id).then(() => {
                    item.loading = false;
                    item.collect = false;
                    this.$message.success('已取消收藏');
                })
            } else {
                collectArticle(item.id).then(() => {
                    item.loading = false;
                    item.collect = true;
                    this.$message.success('已成功收藏');
                })
            }
        }
    },
    data() {
        return {
            busy: false,
            noMore: false,
            showHint: false,
            loading: false,
            currpage: 1,
            datas: [],
        }
    },
    created() {
        this.getQuestionData('init');
    },
    mounted() {
        document.addEventListener('scroll', this.onScroll);
    },
    destroyed() {
        document.removeEventListener('scroll', this.onScroll);
    },
}
</script>

<style lang="scss" scoped>
.question-list {
    width: 660px;
}

.question-item:not(:last-child) {
    margin-bottom: 6px;
}

.date-info {
    color: #4D5760;
    font-weight: 500;
    font-size: 14px;
}

.title {
    color: #303133;
    line-height: 26px;
    font-size: 18px;
    font-weight: 500;
    margin: 0.6rem 0;
    display: inline-flex;
    justify-content: left;
}

.title:hover {
    color: #303133;
}

.collection-container {
    display: flex;
    align-items: center;

    // .tag:not(:first-child) {
    //     flex: 1;
    //     margin-left: 10px;
    // }

    .tag {
        color: #909399;
        font-size: 13px;

        &:not(:first-child) {
            flex: 1;
            margin-left: 10px;
        }
    }
}
</style>