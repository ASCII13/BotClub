<template>
    <list-view :busy="busy" :no-more="noMore" :show-hint="showHint" :loading="loading" :more="more" style="width: 660px;">
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
import ListView from '@/components/ListView';
import { fetchQuestions } from '@/api/question';
import { star, unstar } from '@/api/collection';
export default {
    components: {
        ListView,
    },
    methods: {
        getQuestions(type, pageNum) {
            this.busy = type !== 'init';
            fetchQuestions(pageNum).then(res => {
                const data = res.data;
                const questions = data.datas;

                if (type === 'init') {
                    this.loading = false;
                    if (!data || !questions || questions.length === 0) return;

                    this.datas = questions.map(q => {
                        q.loading = false;
                        return q;
                    });
                    this.pageNum = ++pageNum;
                } else {
                    if (!data || !questions || questions.length === 0) {
                        this.noMore = true;
                    } else {
                        const questionList = questions.map(q => {
                            q.loading = false;
                            return q;
                        });
                        this.datas.push(...questionList);
                        this.pageNum = ++pageNum;
                        this.busy = false;
                    }
                }
            });
        },
        more() {
            this.getQuestions('more', this.pageNum);
        },
        changeCollectionStatus(item) {
            item.loading = true;

            if (item.collect) {
                unstar(item.id).then(() => {
                    item.loading = false;
                    item.collect = false;
                    this.$message.success('已取消收藏');
                });
            } else {
                star(item.id).then(() => {
                    item.loading = false;
                    item.collect = true;
                    this.$message.success('已成功收藏');
                });
            }
        }
    },
    computed: {
        showHint() {
            return !this.loading && (!this.datas || this.datas.length === 0);
        }
    },
    data() {
        return {
            busy: false,
            noMore: false,
            loading: true,
            pageNum: 1,
            datas: [],
        }
    },
    created() {
        this.getQuestions('init', this.pageNum);
    },
}
</script>

<style lang="scss" scoped>
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
    &:hover {
        color: #303133;
    }
}

// .title:hover {
//     color: #303133;
// }

.collection-container {
    display: flex;
    align-items: center;
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