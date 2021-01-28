<template>
    <div class="setting">
        <div v-for="(item, index) in configList" :key="index" class="item">
            <span>{{ item.name }}</span>
            <el-switch v-model="item.status"></el-switch>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            configList: [
                { name: '固定状态栏', status: false },
                { name: '固定导航栏', status: false },
                { name: '固定右侧栏', status: false }
            ],
        }
    }
}
</script>

<style lang="scss" scoped>
.setting {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    height: 60px;
    background-color: white;
    border-top: solid 1px #EBEEF5;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
    animation: test 0.2s;
}

.item {
    display: flex;
    align-items: center;
    font-size: 14px;

    & > span {
        margin-right: 0.5rem;
    }
}

@keyframes test{
    from { height: 0px; }
    to { height: 60px; }
}
</style>