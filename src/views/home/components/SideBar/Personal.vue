<template>
    <el-card shadow="hover" class="personal-panel">
        <div slot="header">个人相关</div>
        <div class="user-info" v-if="name">
            <avatar :size="60" :item="userInfo"></avatar>
            <div class="info" v-if="userInfo">
                <div>积分：{{ userInfo.coinCount || '-' }}</div>
                <div>等级：{{ userInfo.level || '-' }}</div>
                <div>排名：{{ userInfo.rank || '-' }}</div>
            </div>
        </div>
        <div v-for="(item, index) in datas" :key="index" class="item-container">
            <ex-link :href="item.path" :router="true">{{ item.title }}</ex-link>
        </div>
    </el-card>
</template>

<script>
import Avatar from '@/components/Avatar';
import ExLink from '@/components/ExLink';
import { mapGetters } from 'vuex';
import { getSelfRankingInfo } from '@/api/ranking';

export default {
    data() {
        return {
            datas: [
                {
                    title: '积分排行',
                    path: '/ranking-list',
                },
                {
                    title: '收藏文章',
                    path: '/favorite-list',
                },
                {
                    title: '分享文章',
                    path: '/share-list',
                },
                {
                    title: '待办清单',
                    path: '/todo',
                }
            ],
            userInfo: {},
        }
    },
    components: {
        Avatar,
        ExLink,
    },
    methods: {
        getSelfRankingInfo,
    },
    computed: {
        ...mapGetters([
            'name',
            'cookie',
        ])
    },
    watch: {
        name: function(newVal, oldVal) {
            if (newVal !== oldVal) {
                this.userInfo.author = newVal;
            }
        }
    },
    created() {
        if (this.cookie) {
            getSelfRankingInfo().then(res => {
                this.userInfo = res.data;
                this.userInfo.author = this.name;
            })
        }
    },
}
</script>

<style lang="scss" scoped>
.item-container {
    padding: 5px 10px;
    text-align: center;
    font-size: 15px;
}
.user-info {
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    & > div:last-child {
        margin-top: 0.5rem;
    }

    ::v-deep .el-avatar {
        font-size: 1.4rem;
        font-weight: 500;
    }
}
.info {
    display: flex;
    font-size: 13px;

    & > div:not(:last-child) {
        margin-right: 0.6rem;
    }
}
</style>