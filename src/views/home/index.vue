<template>
    <div class="home-container">
        <div class="left-container">
            <el-carousel loop autoplay arrow="hover" height="300px" class="banner-container">
                <el-carousel-item v-for="(item, index) in bannerList" :key="index" :name="item.title">
                    <el-image :src="item.imagePath" fit="fill" style="width: 100%; height: 100%;"></el-image>
                </el-carousel-item>
            </el-carousel>
            <div class="article-container">
                <el-card class="item-container" v-for="(item, index) in articleList" :key="index" :body-style="{ display: 'flex' }">
                    <el-avatar class="avatar">{{ getAvatarText(item.author, item.shareUser) }}</el-avatar>
                    <div class="info-container">
                        <div class="author-info">
                            <div>{{ item.author || item.shareUser }}</div>
                            <div>{{ item.niceDate }}</div>
                        </div>
                        <el-link :href="item.link" :underline="false" target="_blank" class="title">{{ item.title }}</el-link>
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
                                @click="changeCollectionStatus(index)">{{ item.collect ? '已收藏' : '收藏'}}
                            </el-button>
                        </div>
                    </div>
                </el-card>
                <div class="bottom-info">
                    <div v-if="busy">
                        <i class="el-icon-loading"></i>
                        <span style="margin-left: 6px;">加载中...</span>
                    </div>
                    <div v-if="noMore">暂无更多数据</div>
                </div>
            </div>
        </div>
        <div class="right-container">
            <side-bar></side-bar>
        </div>
    </div>
</template>

<script>
import SideBar from './components/SideBar'

import { getBanner, getArticles } from '@/api/home'
import { collectArticle, uncollectArticle } from '@/api/collection'

export default {
    data() {
        return {
            currPage: 0,
            busy: false,
            noMore: false,
            bannerList: [],
            articleList: [],
        }
    },
    created() {
        getBanner().then(res => {
            this.bannerList = res.data
        }),
        this.getArticleList('init')
    },
    mounted() {
        document.addEventListener('scroll', this.onScroll);
    },
    components: {
        SideBar,
    },
    methods: {
        getAvatarText() {
            if (arguments[0]) {
                return arguments[0].charAt(0)
            }
            return arguments[1].charAt(0)
        },
        changeCollectionStatus(index) {
            this.articleList[index].loading = true;
            let currArticle = this.articleList[index];
            if (currArticle.collect) {
                uncollectArticle(currArticle.id).then(() => {
                    this.articleList[index].collect = false
                    this.articleList[index].loading = false
                    this.$message.success('已取消收藏')
                }) 
            } else {
                collectArticle(currArticle.id).then(() => {
                    this.articleList[index].collect = true
                    this.articleList[index].loading = false
                    this.$message.success('已成功收藏')
                })
            }
        },
        getArticleList(state) {
            switch (state) {
                case 'init':
                    getArticles(0).then(res => {
                        let dataList = res.data.datas;
                        if (dataList && dataList.length != 0) {
                            this.currPage += 1;
                            this.articleList = dataList.map(item => {
                                item.loading = false;
                                return item;
                            });
                        }
                    })
                    break;

                case 'more':
                    this.busy = true;
                    getArticles(this.currPage).then(res => {
                        this.busy = false;
                        let dataList = res.data.datas;
                        if (dataList && dataList.length != 0) {
                            this.currPage += 1;
                            let tmp = dataList.map(item => {
                                item.loading = false;
                                return item;
                            });
                            this.articleList.push(...tmp);
                        } else {
                            this.noMore = true;
                        }
                    })
                    break;

                default:
                    break;
            }
        },
        /**
         * scrollHeight 总的可滚动高度
         * scrollTop 已滚动的高度
         * clientHeight 可视区域高度
         */
        onScroll() {
            if (this.busy) return;
            
            let scrollView = document.documentElement || document.body;
            if (scrollView.scrollHeight - scrollView.scrollTop <= scrollView.clientHeight) {
                console.log('触发了上拉加载');
                this.getArticleList('more');
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.home-container {
    display: flex;

    .left-container {
        width: 600px;
        display: flex;
        flex-direction: column;

        .banner-container {
            border-radius: 5px;
        }

        .article-container {
            margin-top: 6px;
            // overflow: auto;
            // height: 100%;

            .item-container {
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
                        font-size: 18px;
                        font-weight: bold;
                        margin: 0.8rem 0;
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
            }

            .item-container:not(:last-child) {
                margin-bottom: 6px;
            }

            .bottom-info {
                color: #909399;
                text-align: center;
                line-height: 60px;


            }
        }
    }

    .right-container {
        height: fit-content;
        margin-left: 0.6rem;
    }
}
</style>