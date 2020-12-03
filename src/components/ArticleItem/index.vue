<template>
    <el-card class="article-item-container" :body-style="{ display: 'flex' }">
        <el-avatar class="avatar">{{ getAvatarText(item.author, item.shareUser) }}</el-avatar>
        <div class="info-container">
            <div class="author-info">
                <div>{{ item.author || item.shareUser }}</div>
                <div>{{ item.niceDate }}</div>
            </div>
            <el-link :href="item.link" :underline="false" target="_blank" class="title"><span v-html="item.title"></span></el-link>
            <div>
                <div class="classification">
                    <span>#{{ item.superChapterName }}</span>
                    <span>#{{ item.chapterName }}</span>
                </div>
                <el-button
                    size="mini"
                    style="width: 80px;"
                    :loading="item.loading"
                    :type="item.collect ? 'primary' : 'info'"
                    @click="changeCollectionStatus(item)">{{ item.collect ? '已收藏' : '收藏'}}
                </el-button>
            </div>
        </div>
    </el-card>
</template>

<script>
import { mapGetters } from 'vuex';
import { collectArticle, uncollectArticle } from '@/api/collection';

export default {
    props: {
        item: {
            type: Object,
            required: true,
            default: function() {
                return {}
            }
        }
    },
    methods: {
        getAvatarText() {
            if (arguments[0]) {
                return arguments[0].charAt(0)
            }
            return arguments[1].charAt(0)
        },
        changeCollectionStatus(item) {
            if (!this.cookie) {
                this.$router.push('/login');
            } else {
                item.loading = true;

                if (item.collect) {
                    uncollectArticle(item.id).then(() => {
                        item.collect = false;
                        item.loading = false;
                        this.$message.success('已取消收藏');
                    })
                } else {
                    collectArticle(item.id).then(() => {
                        item.collect = true;
                        item.loading = false;
                        this.$message.success('已成功收藏');
                    })
                }
            }
        },
    },
    computed: {
        ...mapGetters([
            'cookie',
        ])
    }
}
</script>

<style lang="scss" scoped>
.article-item-container {
    padding: 10px;

    .avatar {
        background-color: #59a57c;
    }

    .info-container {
        display: flex;
        flex: 1;
        flex-direction: column;
        margin-left: 0.5rem;

        .author-info {
            line-height: 18px;
            font-weight: 500;
            font-size: 14px;
            color: #4D5760;

            & > div:last-child {
                font-size: 13px;
                margin-top: 0.1rem;
            }
        }

        .title {
            color: #303133;
            line-height: 26px;
            font-size: 18px;
            font-weight: 500;
            margin: 0.6rem 0;
            display: flex;
            justify-content: left;
        }

        & > div:last-child {
            display: flex;
            align-items: center;

            .classification {
                flex: 1;
                color: #909399;
                font-size: 13px;

                & > span:not(last-child) {
                    margin-right: 10px;
                }
            }
        }
    }
    
    &:not(:first-child) {
        margin-top: 6px;
    }
}
</style>

<style lang="scss">
.highlight {
    color: red;
    font-style: normal;    
}
</style>