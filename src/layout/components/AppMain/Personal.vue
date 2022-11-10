<template>
    <el-card shadow="hover">
        <div slot="header">个人相关</div>
        <div class="user-info" v-show="cookie">
            <avatar :size="60" :name="user.name" :userId="user.userId"/>
            <div class="info">
                <div>积分: {{ user.coinCount || '-' }}</div>
                <div>等级: {{ user.level || '-' }}</div>
                <div>排名: {{ user.rank || '-' }}</div>
            </div>
        </div>
        <div v-for="(item, index) in datas" :key="index" class="item-container">
            <ex-link :href="item.path" :router="true">{{ item.title }}</ex-link>
        </div>
    </el-card>
</template>

<script>
import { mapGetters } from 'vuex';
import Avatar from '@/components/Avatar';
import ExLink from '@/components/ExLink';
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
                    path: '/todos',
                }
            ],
        }
    },
    components: {
        Avatar,
        ExLink,
    },
    computed: {
        ...mapGetters([
            'user',
            'cookie',
        ])
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