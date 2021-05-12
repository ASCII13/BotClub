<template>
    <div class="setting">
        <div v-for="(item, index) in configList" :key="index" class="item">
            <span>{{ item.name }}</span>
            <el-switch v-model="item.status" @change="switchStatus($event, item.name)"></el-switch>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Setting',
    props: {
        fixedHeader: {
            type: Boolean,
            required: true,
        }
    },
    data() {
        return {
            configList: [
                { name: '固定搜索栏', status: this.fixedHeader },
            ],
        }
    },
    methods: {
        switchStatus(currState, type) {
            switch (type) {
                case '固定搜索栏':
                    this.$store.dispatch('app/setHeaderStatus', currState);
                    break;
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.setting {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    background-color: white;
    border-top: solid 1px #EBEEF5;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
}

.item {
    display: flex;
    align-items: center;
    font-size: 14px;

    & > span {
        margin-right: 0.5rem;
    }
}
</style>