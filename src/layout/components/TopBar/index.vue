<template>
    <div class="top-bar-container">
        <div class="logo" @click="backToHome">VA</div>
        <el-input
            clearable
            placeholder="多个关键字用空格隔开..."
            class="search-bar"
            v-model="searchContent"
            @change="search">
        </el-input>
        <div class="right-actions">
            <div v-if="!name">
                <router-link to="/login">登录</router-link>
                <el-divider direction="vertical"></el-divider>
                <router-link to="/register">注册</router-link>
            </div>
            <div v-else>
                <el-dropdown @command="handleCommand">
                    <span class="nickname">{{ name }}
                        <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            searchContent: '',
        }
    },
    computed: {
        ...mapGetters([
            'name',
        ])
    },
    methods: {
        handleCommand(command) {
            switch (command) {
                case "logout":
                    this.$store.dispatch('user/logout').then(() => {
                        this.$message.success('已退出登录');
                    })
                    break;
            
                default:
                    break;
            }
        },
        backToHome() {
            this.$router.push('/');
        },
        search() {
            if (!this.searchContent) return;
            this.$store.dispatch('app/setSearchKey', this.searchContent);

            if (this.$route.path === '/search-result/index') return;
            this.$router.push('/search-result');
        }
    }
}
</script>

<style lang="scss" scoped>
.top-bar-container {
    height: 56px;
    display: flex;
    align-items: center;
    background-color: #ffffff;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);

    .logo {
        margin-left: auto;
        width: 50px;
        line-height: 40px;
        text-align: center;
        background-color: black;
        color: white;
        font-family: Oswald;
        font-size: 28px;
        border-radius: 3px;

        &:hover {
            cursor: pointer;
        }
    }

    .search-bar {
        max-width: 420px;
        margin-left: 1rem;
        margin-right: auto;
    }

    .right-actions {
        margin-right: auto;

        .nickname {
            font-weight: 500;
        }
    }
}
</style>