<template>
    <div class="list-view">
        <div v-if="loading" v-loading="loading" style="margin-top: 8rem;"></div>
        <div v-if="showHint" class="hint-container">
            <el-image :src="require('@/assets/empty.svg')" style="width: 120px; height: 150px;"></el-image>
            <div style="color: #909399;">{{ placeholder }}</div>
        </div>
        <div v-else :class="{ 'wrap-list': wrap }">
            <slot></slot>
        </div>
        <div class="bottom-info" v-if="!showHint">
            <div v-if="busy">
                <i class="el-icon-loading"></i>
                <span style="margin-left: 6px;">{{ moreText }}</span>
            </div>
            <div v-if="noMore">{{ noMoreText }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ListView',
    props: {
        busy: {
            type: Boolean,
            default: false
        },
        noMore: {
            type: Boolean,
            default: false
        },
        showHint: {
            type: Boolean,
            default: false
        },
        wrap: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        },
        more: {
            type: Function,
            default: function() {
                return () => {}
            }
        },
        placeholder: {
            type: String,
            default: '暂无数据'
        },
        moreText: {
            type: String,
            default: '加载中...'
        },
        noMoreText: {
            type: String,
            default: '暂无更多数据'
        }
    },
    methods: {
        /**
         * scrollHeight 总的可滚动高度
         * scrollTop 已滚动的高度
         * clientHeight 可视区域高度
         */
        onScroll() {
            if (this.busy || this.noMore) return;

            let scrollView = document.documentElement || document.body;
            if ((scrollView.scrollHeight > scrollView.clientHeight) &&
            (scrollView.scrollTop + scrollView.clientHeight === scrollView.scrollHeight)) {
                this.more();
            }
        }
    },
    mounted() {
        document.addEventListener('scroll', this.onScroll);
    },
    destroyed() {
        document.removeEventListener('scroll', this.onScroll);
    }
}
</script>

<style lang="scss" scoped>
.list-view {
    .hint-container {
        margin-top: 8rem;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .wrap-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    
    .bottom-info {
        color: #909399;
        text-align: center;
        line-height: 60px;
    }
}
</style>