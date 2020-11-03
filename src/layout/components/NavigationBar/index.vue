<template>
    <div class="nav-container">
        <div class="title">热门标签</div>
        <div class="nav-list">
            <div v-for="(route, index) in routes" :key="index" class="nav-item" :class="{ 'curr-item': route.redirect === currPath }">
                <div @click="navigateTo(route.redirect)">{{ getNavTitle(route.children) }}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currPath: this.$route.path,
        }
    },
    computed: {
        routes() {
            return this.$router.options.routes.filter(item => {
                if (!item.hidden) {
                    return true;
                }
            })
        },
    },
    methods: {
        getNavTitle(children = []) {
            if (children.length != 0) {
                return children[0].meta.title;
            }
        },
        navigateTo(path) {
            if (path === this.currPath) return;
            if (path) {
                this.currPath = path;
                this.$router.push(path);
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.nav-container {
    height: fit-content;

    .title {
        padding: 5px;
        font-weight: 500;
        font-size: 18px;
        border-bottom: 1px solid gray;
    }

    .nav-list {
        width: 200px;
        margin-top: 0.3rem;
        display: flex;
        flex-direction: column;

        .nav-item {
            height: 40px;
            line-height: 40px;
            font-size: 16px;
            color: #303133;
            font-weight: 500;
            padding-left: 5px;
            overflow: hidden;
            position: relative;
        }

        .nav-item.curr-item {
            color: #59a57c;
        }

        .nav-item:hover {
            color: #59a57c;
            background-color: #e3e3e5;
        }

        .nav-item:hover::after {
            content: '查看';
            color: white;
            font-size: 15px;
            background-color: #303133;
            border-radius: 3px;;
            line-height: 30px;
            padding: 0 8px;
            position: absolute;
            right: 5px;
            top: 50%;
            transform: translateY(-50%);
        }
    }
}
</style>