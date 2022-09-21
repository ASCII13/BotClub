<template>
    <list-view :busy="busy" :no-more="noMore" :show-hint="showHint" :more="more" :loading="loading" style="width: 600px;">
        <el-card v-for="(item, index) in favorites" :key="item.id" class="favorite-item" :class="{ 'dark': mode === 'dark' }">
            <el-link :href="item.link" :underline="false" target="_blank" class="title">{{ item.title }}</el-link>
            <div class="info">
                <div class="date">{{ item.niceDate }}</div>
                <el-popover width="200" placement="right" v-model="item.visible">
                    <div slot="reference"><i class="el-icon-star-on"></i></div>
                    <div style="text-align: center;">确定取消收藏该内容？</div>
                    <div style="display: flex; justify-content: center; margin-top: 10px;">
                        <el-button size="mini" style="width: 70px;" @click="item.visible = false">取消</el-button>
                        <el-button type="primary" size="mini" style="width: 70px;" :loading="item.loading" @click="unstar(index)">确定</el-button>
                    </div>
                </el-popover>
            </div>
        </el-card>
    </list-view>
</template>

<script>
import { mapGetters } from 'vuex';
import ListView from '@/components/ListView';
import { fetchFavorites, unstar } from '@/api/favorite';

export default {
    data() {
        return {
            busy: false,
            noMore: false,
            loading: true,
            pageNum: 0,
            favorites: [],
        }
    },
    created() {
        this.getFavorites('init', this.pageNum);
    },
    components: {
        ListView,
    },
    computed: {
        showHint() {
            return !this.loading &&
                (!this.favorites || this.favorites.length === 0);
        },
        ...mapGetters(['mode']),
    },
    methods: {
        unstar(currIndex) {
            let currItem = this.favorites[currIndex];
            currItem.loading = true;

            unstar(currItem.id, currItem.originId).then(() => {
                this.favorites.splice(currIndex, 1);
            }).catch(() => {
                currItem.loading = false;
            })
        },
        getFavorites(type, pageNum) {
            this.busy = type !== 'init';
            fetchFavorites(pageNum).then(res => {
                this.loading = false;

                const data = res.data;
                const favorites = data.datas;

                if (data && favorites && favorites.length > 0) {
                    const tmp = favorites.map(f => {
                        f.visible = false;
                        f.loading = false;
                        return f;
                    });
                    if (type === 'init') {
                        this.favorites = tmp;
                    } else {
                        this.busy = false;
                        this.favorites.push(...tmp);
                    }
                    this.pageNum = ++pageNum;
                } else {
                    if (type !== 'init') {
                        this.busy = false;
                        this.noMore = true;
                    }
                }
            });
        },
        more() {
            this.getFavorites('more', this.pageNum);
        }
    }
}
</script>

<style lang="scss" scoped>
.favorite-item {
    padding: 10px;
    &:not(:first-child) {
        margin-top: 6px;
    }
}
.title {
    color: #303133;
    line-height: 26px;
    font-size: 18px;
    font-weight: 500;
}
.info {
    margin-top: 1rem;
    display: flex;
    align-items: center;
    .date {
        color: #909399;
        font-size: 13px;
    }
    & > :last-child {
        margin-left: auto;
    }
}
.el-icon-star-on {
    font-size: 26px;
    color: $primaryColor;
}
</style>