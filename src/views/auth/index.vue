<template>
    <div style="display: flex; align-items: center;">
        <div class="container" :class="{'right-panel-active': rightPanelActive}">
            <div class="form-container sign-up-container">
                <form @submit.prevent="signUp">
                    <h1>新建账户</h1>
                    <input type="text" placeholder="用户名" required v-model="signUpModel.username" />
                    <input type="password" minlength="6" placeholder="密码" required v-model="signUpModel.password" />
                    <input type="password" minlength="6" placeholder="确认密码" required v-model="signUpModel.repassword" />
					<load-button text="注册" :loading="loading.signUp" :disabled="loading.signUp"/>
                </form>
            </div>
            <div class="form-container sign-in-container">
                <form @submit.prevent="signIn">
                    <h1>登录</h1>
                    <input type="text" placeholder="用户名" required v-model="signInModel.username" />
                    <input type="password" minlength="6" required placeholder="密码" v-model="signInModel.password" />
                    <a @click="$message.warning('暂不支持此功能')">忘记密码?</a>
					<load-button text="登录" :loading="loading.signIn" :disabled="loading.signIn"/>
                </form>
            </div>
            <div class="overlay-container">
                <div class="overlay">
                    <div class="overlay-panel overlay-left">
                        <h1>欢迎回来</h1>
                        <p>正是江南好风景，落花时节又逢君</p>
                        <button class="ghost" @click="rightPanelActive = false">登录</button>
                    </div>
                    <div class="overlay-panel overlay-right">
                        <h1>你好，新朋友!</h1>
                        <p>有朋自远方来，不亦乐乎</p>
                        <button class="ghost" @click="rightPanelActive = true">注册</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import LoadButton from '@/components/LoadButton';
export default {
    data() {
		return {
			rightPanelActive: false,
			path: this.$route.query.path,
			signInModel: {
				username: '',
				password: ''
			},
			signUpModel: {
				username: '',
				password: '',
				repassword: ''
			},
			loading: {
				signUp: false,
				signIn: false
			}
		}
	},
	methods: {
		signUp() {
			const valid = this.validateData(this.signUpModel);
			if (!valid) return;

			this.loading.signUp = true;
			this.$store.dispatch('user/register', this.signUpModel).then(() => {
				this.loading.signUp = false;
				this.$router.replace('/');
			});
		},
		signIn() {
			const valid = this.validateData(this.signInModel);
			if (!valid) return;

			this.loading.signIn = true;
			this.$store.dispatch('user/login', this.signInModel).then(() => {
				this.loading.signIn = false;
				if (this.path) {
					this.$router.replace(this.path);
				} else {
					this.$router.back();
				}
			});
		},
		validateData(model) {
			const keys = Object.keys(model);
			for (let i = 0; i < keys.length; i++) {
				const key = keys[i];
				if (!model[key]) return false;
			}
			return true;
		},
	},
	components: {
		LoadButton,
	}
}
</script>

<style lang="scss" scoped>
h1 {
	font-weight: bold;
	margin: 0;
}
p {
	font-size: 14px;
	// font-weight: 100;
	line-height: 20px;
	letter-spacing: 0.5px;
	margin: 20px 0 30px;
}
// span {
// 	font-size: 12px;
// }
a {
	color: #333;
	font-size: 14px;
	text-decoration: none;
	margin: 15px 0;
}
button {
	width: 6rem;
    border-radius: 20px;
    border: 1px solid $primaryColor;
	background-color: $primaryColor;
	color: #FFFFFF;
	font-size: 12px;
	font-weight: bold;
	padding: 12px 25px;
	letter-spacing: 1px;
	// text-transform: uppercase;
	transition: transform 80ms ease-in;
	&:active {
		transform: scale(0.95);
	}
	&:focus {
		outline: none;
	}
	&:hover {
		cursor: pointer;
	}
	&.ghost {
		background-color: transparent;
		border-color: #FFFFFF;
	}
}
form {
	background-color: #FFFFFF;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 0 50px;
	height: 100%;
	text-align: center;
}
input {
	background-color: #eee;
	border: none;
	padding: 12px 15px;
	margin: 8px 0;
	width: 100%;
}
.container {
	background-color: #fff;
	border-radius: 10px;
    // box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
	box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
	position: relative;
	overflow: hidden;
	width: 768px;
	max-width: 100%;
	min-height: 480px;
	&.right-panel-active {
		.sign-in-container {
			transform: translateX(100%);
		}
		.sign-up-container {
			transform: translateX(100%);
			opacity: 1;
			z-index: 5;
			animation: show 0.6s;
		}
		.overlay-container {
			transform: translateX(-100%);
		}
		.overlay {
			transform: translateX(50%);
		}
		.overlay-left {
			transform: translateX(0);
		}
		.overlay-right {
			transform: translateX(20%);
		}
	}
}
.form-container {
	position: absolute;
	top: 0;
	height: 100%;
	transition: all 0.6s ease-in-out;
}
.sign-in-container {
	left: 0;
	width: 50%;
	z-index: 2;
}
.sign-up-container {
	left: 0;
	width: 50%;
	opacity: 0;
	z-index: 1;
}
@keyframes show {
	0%, 49.99% {
		opacity: 0;
		z-index: 1;
	}
	50%, 100% {
		opacity: 1;
		z-index: 5;
	}
}
.overlay-container {
	position: absolute;
	top: 0;
	left: 50%;
	width: 50%;
	height: 100%;
	overflow: hidden;
	transition: transform 0.6s ease-in-out;
	z-index: 10;
}
.overlay {
	background: $primaryColor;
	background: -webkit-linear-gradient(to right, $primaryColor, #69a530);
	background: linear-gradient(to right, $primaryColor, #69a530);
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 0 0;
	color: #FFFFFF;
	position: relative;
	left: -100%;
	height: 100%;
	width: 200%;
    transform: translateX(0);
	transition: transform 0.6s ease-in-out;
}
.overlay-panel {
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 0 40px;
	text-align: center;
	top: 0;
	height: 100%;
	width: 50%;
	transform: translateX(0);
	transition: transform 0.6s ease-in-out;
}
.overlay-left {
	transform: translateX(-20%);
}
.overlay-right {
	right: 0;
	transform: translateX(0);
}
</style>