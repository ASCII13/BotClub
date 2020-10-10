<template>
    <div class="top-bar-container">
        <div class="logo">
            <!-- <div class="logo-container">
                <span class="text">V</span>
                <span class="text">A</span>
            </div> -->
        </div>
        <el-input
            clearable
            placeholder="搜索..."
            class="search-bar"
            v-model="searchContent">
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
                        <i class="el-icon-arrow-down"></i>
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
import { mapGetters } from 'vuex'

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
                        this.$message({
                            type: 'success',
                            message: '已退出登录'
                        })
                    })
                    break;
            
                default:
                    break;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.top-bar-container {
    height: 56px;
    box-sizing: border-box;
    padding: 10px 260px; 
    display: flex;
    align-items: center;
    background-color: #ffffff;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);

    .logo {
        width: 50px;
        height: 40px;
        text-align: center;
        background-color: #eeeeee;

        // .logo-container {
        //     line-height: 40px;
        //     text-align: center;
        //     background-color: #eeeeee;
        // }

        .text {
            font-size: 22px;
            line-height: 40px;
        }
    }

    .search-bar {
        max-width: 420px;
        flex: 1 auto;
        margin: 0 1rem;
    }

    .right-actions {
        display: flex;
        align-items: center;
        margin-left: auto;

        .nickname {
            color: #3850d7;
        }
    }

}
</style>