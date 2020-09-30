<template>
    <el-card shadow="hover" class="personal-panel">
        <div slot="header">
            <span>个人信息</span>
        </div>
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
                    title: '积分详情',
                    path: '/login',
                },
                {
                    title: '收藏文章',
                    path: '/login',
                },
                {
                    title: '代办事项',
                    path: '/login',
                }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
.personal-panel {
    width: 300px;

    .item-container {
        padding: 5px 10px;
        text-align: center;
        font-size: 15px;
    }
}
</style>