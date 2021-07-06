<template>
    <div class="notifications">
        <div class="tab">
            <div class="tab-item"
                :class="{ 'curr-tab': currTab === index }"
                v-for="(item, index) in tabList"
                :key="index"
                @click="switchTab(index)">{{ item.title }}
            </div>
        </div>
        <list-view :showHint="showHint" :busy="busy" :noMore="noMore" :more="more" :loading="loading">
            <div class="msg-item" v-for="(item, index) in tabList[currTab].data" :key="index">
                <div class="tag">
                    <span>{{ item.tag }}</span>
                    <span>{{ item.niceDate }}</span>
                </div>
                <div class="title">
                    <ex-link :href="item.fullLink" class="link">
                        <span>@{{ item.fromUser }}</span>
                        <span>{{ ' ' + item.title }}</span>
                    </ex-link>
                </div>
                <div class="preview">{{ item.message }}</div>
            </div>
        </list-view>
    </div>
</template>

<script>
import ListView from '@/components/ListView';
import ExLink from '@/components/ExLink';
import { getReadMsgList, getUnreadMsgList } from '@/api/notification';

export default {
    data() {
        return {
            tabList: [
                {
                    title: '未读消息',
                    currPage: 1,
                    data: [],
                },
                {
                    title: '历史消息',
                    currPage: 1,
                    data: [],
                }
            ],
            currTab: 0,
            showHint: false,
            busy: false,
            noMore: false,
            loading: false,
        }
    },
    created() {
        this.getMsg('init');
    },
    methods: {
        switchTab(index) {
            if (index === this.currTab) return;
            this.currTab = index;
            this.getMsg('init');
        },
        more() {
            this.getMsg('more');
        },
        getMsg(type) {
            let currData = this.getCurrData();

            if (type === 'init') {
                this.loading = true;
                this.showHint = false;
                this.noMore = false;
                currData.data = [];

                if (currData.title === '未读消息') {
                    getUnreadMsgList().then(res => {
                        this.loading = false;
                        if (res.data.datas.length > 0) {
                            currData.data = res.data.datas;
                            currData.currPage += 1;
                        } else {
                            this.showHint = true;
                        }
                    })
                }
                if (currData.title === '历史消息') {
                    getReadMsgList().then(res => {
                        this.loading = false;
                        if (res.data.datas.length > 0) {
                            currData.data = res.data.datas;
                            currData.currPage += 1;
                        } else {
                            this.showHint = true;
                        }
                    });
                }
            }
            if (type === 'more') {
                this.busy = true;
                if (currData.title === '未读消息') {
                    getUnreadMsgList(currData.currPage).then(res => {
                        this.busy = false;
                        if (res.data.datas.length > 0) {
                            currData.data.push(...res.data.datas);
                            currData.currPage += 1;
                        } else {
                            this.noMore = true;
                        }
                    })
                }
                if (currData.title === '历史消息') {
                    getReadMsgList(currData.currPage).then(res => {
                        this.busy = false;
                        if (res.data.datas.length > 0) {
                            currData.data.push(...res.data.datas);
                            currData.currPage += 1;
                        } else {
                            this.noMore = true;
                        }
                    })
                }
            }
        },
        getCurrData() {
            return this.tabList[this.currTab];
        }
    },
    components: {
        ListView,
        ExLink,
    }
}
</script>

<style lang="scss" scoped>
.notifications {
    width: 700px;
}
.tab {
    text-align: end;
    background-color: #E0E4E6;

    .tab-item {
        display: inline-block;
        padding: 13px 15px;

        &:hover {
            cursor: pointer;
        }

        &.curr-tab {
            color: $primaryColor;
            background-color: #ffffff;
        }
    }
}
.msg-item {
    padding: 1rem 1.3rem;
    background-color: white;
    border-radius: 6px;
    border: 1px solid #EBEEF5;

    &:not(:last-child) {
        margin-bottom: 6px;
    }
    
    & > div:not(:last-child) {
        margin-bottom: 0.5rem;
    }
    .tag {
        font-size: 14px;

        & > span:first-child::after {
            content: ' - ';
        }
    }
    .title {
        line-height: 26px;
        font-size: 18px;

        .link {
            font-size: inherit;
        }

        span:first-child {
            color: $primaryColor;
            font-style: italic;
        }
    }
    .preview {
        font-size: 14px;
        line-height: 1.2rem;
    }
}
</style>