<template>
    <div class="login-container">
        <el-card class="login-panel">
            <div class="description">
                <div>Welcome to VA</div>
                <div>VA is a community based on Vue and WANANDROID API</div>
            </div>
            <el-divider content-position="center">Login with your username and password</el-divider>
            <el-form
                ref="loginForm"
                :model="loginModel"
                :rules="loginRule">
                <el-form-item prop="username">
                    <el-input
                        clearable
                        placeholder="请输入用户名" 
                        v-model="loginModel.username">
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        clearable
                        show-password
                        placeholder="请输入密码"
                        v-model="loginModel.password">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleLogin" :loading="loading">登录</el-button>
                </el-form-item>
            </el-form>
            <router-link to="/register">还没有账号？</router-link>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loginRule: {
                username: [
                    {
                        required: true,
                        message: '用户名不能为空',
                        trigger: 'blur'
                    }
                ],
                password: [
                    {
                        required: true,
                        message: '密码不能为空',
                        trigger: 'blur'
                    }
                ]
            },
            loginModel: {
                username: '',
                password: ''
            },
            loading: false,
        }
    },
    methods: {
        handleLogin() {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    this.loading = true
                    this.$store.dispatch('user/login', this.loginModel).then(() => {
                        this.$router.push('/')
                        this.loading = false
                    }).catch(() => {
                        this.loading = false
                    })
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.login-container {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    .login-panel {
        width: 640px;
        padding: 3rem;
        background-color: #ffffff;

        .description {
            text-align: center;

            & > div:first-child {
                font-size: 1.875rem;
                font-weight: bold;
            }

            & > div:last-child {
                font-weight: normal;
            }
        }
    }
}
</style>