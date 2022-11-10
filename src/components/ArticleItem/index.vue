<template>
    <el-card class="article-item-container" :body-style="{ display: 'flex' }">
        <avatar :name="item.author || item.shareUser" :userId="item.userId"></avatar>
        <div class="info-container">
            <div class="author-info">
                <div>{{ item.author || item.shareUser }}</div>
                <div class="release-date">{{ item.niceDate }}</div>
            </div>
            <el-link :href="item.link" :underline="false" target="_blank" class="title"><span v-html="item.title"></span></el-link>
            <div class="tags">
                <div class="classification">
                    <span v-if="item.top" style="color: red;">置顶</span>
                    <span>{{ item.superChapterName }}</span>
                    <span>{{ item.chapterName }}</span>
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
import Avatar from '@/components/Avatar';
import { star, unstar } from '@/api/collection';

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
        changeCollectionStatus(item) {
            if (!this.cookie) {
                this.$router.push('/auth');
            } else {
                item.loading = true;

                if (item.collect) {
                    unstar(item.id).then(() => {
                        item.collect = false;
                        item.loading = false;
                        this.$message.success('已取消收藏');
                    })
                } else {
                    star(item.id).then(() => {
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
    },
    components: {
        Avatar,
    },
}
</script>

<style lang="scss" scoped>
.article-item-container {
    padding: 10px;

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
           .release-date {
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
        .tags {
            display: flex;
            align-items: center;
            .classification {
                flex: 1;
                color: #525252;
                font-size: .75rem;
                & > span:not(last-child) {
                    margin-right: 10px;
                }
                & > span {
                    padding: .25rem .5rem;
                    line-height: .75rem;
                    border-radius: .75rem;
                    background-color: #e8e8eb;
                }
            }
        }
    }
    &:not(:first-child) {
        margin-top: 6px;
    }
}
.dark-mode {
    .article-item-container {
        background-color: $elementBgDark;
        border-color: $elementBgDark;
        .title {
            color: $textColorDark;
        }
        .author-info {
            color: gray;
        }
        .classification > span {
            background-color: $inputBgColorDark !important;
            color: $textColorDark;
        }
    }
}
</style>

<style lang="scss">
.highlight {
    color: red;
    font-style: normal;    
}
</style>