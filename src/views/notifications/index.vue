<template>
    <div style="width: 600px;">
        <div class="tab">
            <div class="tab-item"
                :class="{ 'curr-tab': currTab === index }"
                v-for="(item, index) in tabList"
                :key="index"
                @click="currTab = index">{{ item.title }}
            </div>
        </div>
        <list-view :show-hint="showHint" :busy="busy" :no-more="noMore" :more="more" :loading="loading">
            <div class="msg-item" v-for="(item, index) in currData.data" :key="index">
                <div class="tag">
                    <span>{{ item.tag }}</span>
                    <span>{{ item.niceDate }}</span>
                </div>
                <div class="title">
                    <ex-link :href="item.fullLink" :underlined="false" class="link">
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
import ExLink from '@/components/ExLink';
import ListView from '@/components/ListView';
import { fetchReadMsgs, fetchUnreadMsgs } from '@/api/notification';

export default {
    data() {
        return {
            tabList: [
                {
                    title: '未读消息',
                    pageNum: 1,
                    data: [],
                    busy: false,
                    noMore: false,
                    loading: true,
                },
                {
                    title: '历史消息',
                    pageNum: 1,
                    data: [],
                    busy: false,
                    noMore: false,
                    loading: true,
                }
            ],
            currTab: 0,
        }
    },
    methods: {
        more() {
            this.busy = true;
            const currTab = this.currTab;
            const currData = this.currData;

            if (currTab === 0) {
                fetchUnreadMsgs(currData.pageNum).then(res => {
                    this.setData(res, currData, 'more');
                    this.busy = false;
                });
            } else if (currTab === 1) {
                fetchReadMsgs(currData.pageNum).then(res => {
                    this.setData(res, currData, 'more');
                    this.busy = false;
                });
            }
        },
        setData(res, currData, type = 'init') {
            const data = res.data;
            const msgs = data.datas;
            if (data && msgs && msgs.length > 0) {
                currData.data = msgs;
                currData.pageNum++;
            } else {
                if (type === 'init') return;
                this.noMore = true;
            }
        },
    },
    components: {
        ListView,
        ExLink,
    },
    computed: {
        currData() {
            return this.tabList[this.currTab];
        },
        showHint() {
            return !this.currData.loading &&
                (!this.currData.data || this.currData.data.length === 0);
        },
        busy: {
            get() {
                return this.currData.busy;
            },
            set(newVal) {
                this.currData.busy = newVal;
            }
        },
        noMore: {
            get() {
                return this.currData.noMore;
            },
            set(newVal) {
                this.currData.noMore = newVal;
            }
        },
        loading: {
            get() {
                return this.currData.loading;
            },
            set(newVal) {
                this.currData.loading = newVal;
            }
        }
    },
    watch: {
        currTab: {
            immediate: true,
            handler(val, oldVla) {
                if (val === oldVla) return;

                const currData = this.currData;
                if (!currData.data.length && val === 0) {
                    this.loading = true;
                    fetchUnreadMsgs().then(res => {
                        this.loading = false;
                        this.setData(res, currData);
                    });
                } else if (!currData.data.length && val === 1) {
                    this.loading = true;
                    fetchReadMsgs().then(res => {
                        this.loading = false;
                        this.setData(res, currData);
                    });
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
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
.dark-mode {
    .tab {
        color: $textColorDark;
        background-color: $inputBgColorDark;
    }
    .tab-item.curr-tab {
        color: inherit;
        background-color: darkolivegreen;
    }
    .msg-item {
        color: $textColorDark;
        border-color: $elementBgDark;
        background-color: $elementBgDark;
    }
}
</style>