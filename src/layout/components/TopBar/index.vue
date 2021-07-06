<template>
    <div :class="{ 'fixed-header': fixedHeader }">
        <div class="top-bar" :class="{ 'dark-mode': mode === 'dark' }">
            <div class="logo" @click="backToHome">BC</div>
            <div class="search-bar">
                <el-input
                    clearable
                    placeholder="多个关键字用空格隔开..."
                    style="width: 100%;"
                    v-model="searchContent"
                    @focus="getPopularWords"
                    @keyup.enter.native="search">
                </el-input>
                <div class="hot-words" v-show="visible">
                    <div class="word" v-for="item in hotWords" :key="item.id" @click="onClickHotWord(item.name)">{{ item.name }}</div>
                </div>
            </div>
            <div class="user">
                <div v-if="!name">
                    <router-link to="/login">登录</router-link>
                    <el-divider direction="vertical"></el-divider>
                    <router-link to="/register">注册</router-link>
                </div>
                <el-dropdown v-else @command="handleCommand">
                    <span class="nickname">{{ name }}
                        <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <router-link to="/notifications" v-if="name" class="notification">
                <span class="el-icon-bell"></span>
                <span class="red-point" v-if="notification"></span>
            </router-link>
            <i class="el-icon-set-up" @click="visibleSetting = !visibleSetting"></i>
            <!-- <img :src="require(`@/assets/mode-${mode}.svg`)" @click="isDark = !isDark" /> -->
        </div>
        <transition name="slide">
            <setting class="setting-panel" v-show="visibleSetting" :fixedHeader="fixedHeader"></setting>
        </transition>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getHotWords } from '@/api/search';
import Setting from './Setting';

export default {
    data() {
        return {
            searchContent: '',
            hotWords: [],
            visible: false,
            isDark: undefined,
            visibleSetting: false,
            notification: true,
        }
    },
    created() {
        this.isDark = this.mode === 'dark' ? true : false;
        // getUnreadMsgCount().then(res => {
        //     if (res.data > 0) {
        //         this.showRedPoint = true;
        //     }
        // });
    },
    mounted() {
        document.addEventListener('click', e => {
            if (e.target.className === 'el-input__inner' && e.target.placeholder === '多个关键字用空格隔开...') {
                this.visible = true;
            } else {
                this.visible = false;
            }
        })
    },
    computed: {
        ...mapGetters([
            'name',
            'mode',
            'fixedHeader',
        ])
    },
    components: {
        Setting,
    },
    methods: {
        handleCommand(command) {
            switch (command) {
                case "logout":
                    this.$store.dispatch('user/logout').then(() => {
                        window.location.reload();
                    })
                    break;
            }
        },
        backToHome() {
            this.$router.push('/');
        },
        search() {
            if (!this.searchContent) return;

            this.visible = false;
            this.$store.dispatch('app/setKeywords', this.searchContent);

            if (this.$route.path === '/search-result/index') return;
            this.$router.push('/search-result');
        },
        getPopularWords() {
            getHotWords().then(res => {
                if (res.data.length > 0) {
                    this.hotWords = res.data;
                }
            })
        },
        onClickHotWord(keyword) {
            this.searchContent = keyword;
            this.search();
        },
        changeMode(mode) {
            this.$store.dispatch('app/setMode', mode);
        }
    },
    watch: {
        isDark(val) {
            if (val) {
                this.changeMode('dark');
            } else {
                this.changeMode('light');
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.top-bar {
    height: 56px;
    display: flex;
    align-items: center;
    background-color: #ffffff;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);

    &.dark-mode {
        background-color: $elementBgDark;
    } 

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
        width: 420px;
        margin-left: 1rem;
        margin-right: auto;
        position: relative;

        .hot-words {
            position: absolute;
            width: 100%;
            max-height: 10rem;
            overflow: auto;
            padding: 0.5rem 1rem;
            font-size: 14px;
            background-color: #ffffff;
            box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            z-index: 999;
            cursor: pointer;

            & > div:hover {
                color: $primaryColor;
            }

            & > div {
                line-height: 30px;
                font-weight: 400;
            }
        }
    }

    .user {
        &:hover {
            cursor: pointer;
        }

        .nickname {
            display: inline-block;
            line-height: 40px;
            font-weight: 500;
            padding: 0 5px;

            .el-icon-caret-bottom {
                width: 14px;
                transition: transform 0.3s;
            }

            &:hover > i {
                transform: rotate(180deg);
            }
        }
    }

    .el-icon-bell,
    .el-icon-set-up {
        width: 25px;
        line-height: 25px;
        font-size: 20px;
        text-align: center;
        // margin: {
        //     left: 0.6rem;
        //     right: auto;
        //     right: 0.6rem;
        // }
        color: #606266;
    }

    .notification {
        margin-left: 0.6rem;

        // &::after {
        //     position: absolute;
        //     margin-left: -3px;
        //     content: ' ';
        //     border: 3px solid red;
        //     border-radius: 3px;
        // }
    }

    .red-point {
        position: absolute;
        margin-left: -0.4rem;
        border: 3px solid red;
        border-radius: 3px;
    }

    .el-icon-set-up {
        margin: {
            left: 0.6rem;
            right: auto;
        }
    }

    img {
        width: 25px;
        margin-right: auto;

        &:hover {
            cursor: pointer;
        }
    }
}

.setting-panel {
    height: 60px;
}

.slide-enter-active,
.slide-leave-active {
    transition: height 0.1s linear;
}

.slide-enter,
.slide-leave {
    height: 0px;
}

.fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 11;
}
</style>