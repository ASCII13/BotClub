<template>
    <div class="register-container">
        <el-card class="register-panel">
            <div class="description">
                <div>Welcome to BC</div>
                <div>BC is a community built on Vue and WANANDROID API</div>
            </div>
            <el-divider content-position="center">Enter your information for register</el-divider>
            <el-form
                ref="registerForm"
                :model="registerModel"
                :rules="registerRule">
                <el-form-item prop="username">
                    <el-input
                        clearable
                        placeholder="请输入用户名" 
                        v-model="registerModel.username">
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        clearable
                        show-password
                        placeholder="请输入密码"
                        v-model="registerModel.password">
                    </el-input>
                </el-form-item>
                <el-form-item prop="confirmPassword">
                    <el-input
                        clearable
                        show-password
                        placeholder="请再次输入密码"
                        v-model="registerModel.confirmPassword">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="register">注册</el-button>
                </el-form-item>
            </el-form>
            <router-link to="/login">已有其他账号？</router-link>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        let validatePassword = (rule, value, callback) => {
            if (value !== this.registerModel.password) {
                callback(new Error('两次输入的密码不一致'))
            } else {
                callback()
            }
        };
        return {
            registerRule: {
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
                ],
                confirmPassword: [
                    {
                        required: true,
                        message: '确认密码不能为空',
                        trigger: 'blur'
                    },
                    {
                        required: true,
                        validator: validatePassword,
                        trigger: 'blur'
                    }
                ]
            },
            registerModel: {
                username: '',
                password: '',
                confirmPassword: ''
            },
            loading: false,
        }
    },
    methods: {
        register() {
            this.$refs.registerForm.validate((valid) => {
                if (valid) {
                    this.$message('触发了注册')
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.register-container {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .register-panel {
        width: 740px;
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