<template>
    <div class="nav-container">
        <div class="title">热门标签</div>
        <div class="nav-list">
            <div v-for="(route, index) in routes"
                :key="index"
                class="nav-item"
                :class="{ 'curr-item': route.redirect === currPath }"
                @click="navigateTo(route.path)">{{ getNavTitle(route.children) }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        routes() {
            return this.$router.options.routes.filter(item => {
                if (!item.hidden) {
                    return true;
                }
            })
        },
        currPath() {
            return this.$route.path;
        }
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

        &:hover {
            cursor: pointer;
        }

        .nav-item {
            height: 36px;
            line-height: 36px;
            font-size: 16px;
            color: #303133;
            font-weight: 500;
            padding-left: 5px;
            overflow: hidden;
            position: relative;

            &:not(:last-child) {
                margin-bottom: 0.2rem;
            }
        }

        .nav-item.curr-item,
        .nav-item:hover {
            color: $primaryColor;
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