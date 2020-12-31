<template>
    <el-card shadow="hover" class="personal-panel">
        <div slot="header">个人相关</div>
        <div v-for="(item, index) in datas" :key="index" class="item-container">
            <router-link :to="item.path">{{ item.title }}</router-link>
        </div>
    </el-card>
</template>

<script>
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
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
.item-container {
    padding: 5px 10px;
    text-align: center;
    font-size: 15px;
}
</style>