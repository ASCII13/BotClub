<template>
    <!-- <div :class="{ 'fixed-header': fixedHeader }"> -->
        <div class="top-bar" :class="{ 'dark-mode': mode === 'dark' }">
            <div class="logo" @click="backToHome">BC</div>
            <div class="search-bar">
                <el-input
                    clearable
                    placeholder="多个关键字用空格隔开"
                    style="width: 100%;"
                    v-model="keywords"
                    @focus="getHotWords"
                    @keyup.enter.native="search">
                </el-input>
                <div class="hot-words" v-show="visible.hotWords">
                    <div class="word" v-for="item in hotWords" :key="item.id" @click="onClickHotWord(item.name)">{{ item.name }}</div>
                </div>
            </div>
            <div class="func">
                <div class="user">
                    <router-link v-if="!name" to="/auth">登录</router-link>
                    <template v-else>
                        <span class="nickname">{{ name }}
                            <i class="el-icon-caret-bottom"></i>
                        </span>
                        <ul class="menu">
                            <li @click="signOut">退出登录</li>
                        </ul>
                    </template>
                </div>
                <router-link to="/notifications" v-if="name">
                    <span class="el-icon-bell"></span>
                    <span class="red-dot" v-if="visible.redDot"></span>
                </router-link>
            </div>
            <!-- <div class="user"> -->
                <!-- <template v-if="!name"> -->
                    <!-- <router-link v-if="!name" to="/auth">登录</router-link> -->
                    <!-- <el-divider direction="vertical"></el-divider>
                    <router-link to="/auth">注册</router-link> -->
                <!-- </template> -->
                <!-- <template v-else>
                    <span class="nickname">{{ name }}
                        <i class="el-icon-caret-bottom"></i>
                    </span>
                    <ul class="menu">
                        <li @click="signOut">退出登录</li>
                    </ul>
                </template> -->
                <!-- <el-dropdown v-else @command="handleCommand">
                    <span class="nickname">{{ name }}
                        <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown> -->
            <!-- </div> -->
            <!-- <router-link to="/notifications" v-if="name" class="notification">
                <span class="el-icon-bell"></span>
                <span class="red-dot" v-if="visible.redDot"></span>
            </router-link> -->
            <!-- <i class="el-icon-set-up" @click="visible.setting = !visible.setting"></i> -->
            <!-- <i class="el-icon-set-up" @click="visibleSetting = !visibleSetting"></i> -->
            <!-- <img :src="require(`@/assets/mode-${mode}.svg`)" @click="isDark = !isDark" /> -->
        </div>
        <!-- <transition name="slide">
            <setting class="setting-panel" v-show="visible.setting" :fixedHeader="fixedHeader"></setting>
        </transition> -->
    <!-- </div> -->
</template>

<script>
// import Setting from './Setting';
import { mapGetters } from 'vuex';
import { fetchHotWords } from '@/api/search';

export default {
    data() {
        return {
            // searchContent: '',
            keywords: '',
            hotWords: [],
            visible: {
                setting: false,
                hotWords: false,
                redDot: true,
            },
            // isDark: undefined,
            // visibleSetting: false,
            // notification: true,
        }
    },
    // created() {
        // this.isDark = this.mode === 'dark' ? true : false;
        // getUnreadMsgCount().then(res => {
        //     if (res.data > 0) {
        //         this.showRedPoint = true;
        //     }
        // });
    // },
    mounted() {
        document.addEventListener('click', e => {
            if (e.target.className === 'el-input__inner' && e.target.placeholder === '多个关键字用空格隔开') {
                // this.visible = true;
                this.visible.hotWords = true;
            } else {
                // this.visible = false;
                this.visible.hotWords = false;
            }
        })
    },
    computed: {
        ...mapGetters([
            'name',
            'mode',
            // 'fixedHeader',
        ]),
        isDark() {
            if (this.mode === 'dark') {
                return true;
            } else {
                return false;
            }
        }
    },
    // components: {
    //     Setting,
    // },
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
            if (!this.keywords) return;

            this.visible.hotWords = false;
            this.$store.dispatch('app/setKeywords', this.keywords);

            if (this.$route.path === '/search-result/index') return;
            this.$router.push('/search-result');
        },
        getHotWords() {
            fetchHotWords().then(res => {
                if (res.data && res.data.length) {
                    this.hotWords = res.data;
                }
                // if (res.data.length > 0) {
                //     this.hotWords = res.data;
                // }
            })
        },
        onClickHotWord(keywords) {
            this.keywords = keywords;
            this.search();
        },
        changeMode(mode) {
            this.$store.dispatch('app/setMode', mode);
        },
        signOut() {
            this.$store.dispatch('user/logout').then(() => window.location.reload());
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
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 11;
    height: 56px;
    display: flex;
    align-items: center;
    background-color: #ffffff;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
    &.dark-mode {
        background-color: $elementBgDark;
    }
    .logo {
        margin-left: 15rem;
        min-width: 50px;
        line-height: 40px;
        text-align: center;
        background-color: black;
        color: white;
        font-family: Oswald;
        font-size: 28px;
        border-radius: 3px;
        // text-shadow: 0 0 3vw #179E05;
        // animation: flux 2s linear infinite;
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
    .func{
        display: flex;
        margin-right: 15rem;
    }
    .user {
        position: relative;
        // margin-right: auto;
        &:hover {
            cursor: pointer;
        }
        &:hover ul,
        ul:hover {
            display: block;
        }
        & > a {
            display: block;
            font-size: 1rem;
            line-height: 56px;
        }
        .nickname {
            display: inline-block;
            min-width: 6rem;
            line-height: 56px;
            text-align: center;
            font-weight: 500;
            padding: 0 10px;
            .el-icon-caret-bottom {
                width: 16px;
                height: 16px;
                // transition: transform 0.3s;
            }
            &:hover > i {
                transform: rotate(180deg);
            }
        }
        .menu {
            display: none;
            position: absolute;
            background-color: white;
            margin: 0;
            width: 8rem;
            z-index: 11;
            list-style: none;
            border-radius: 4px;
            padding-inline-start: 1rem;
            box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
            li {
                line-height: 2.6rem;
            }
        }
    }
    .el-icon-bell,
    .el-icon-set-up {
        width: 25px;
        line-height: 56px;
        font-size: 20px;
        text-align: center;
        // margin: {
        //     left: 0.6rem;
        //     right: auto;
        //     right: 0.6rem;
        // }
        color: #606266;
    }
    // .notification {
        // margin-right: auto;
        // float: right;
        // margin-left: 0.6rem;

        // &::after {
        //     position: absolute;
        //     margin-left: -3px;
        //     content: ' ';
        //     border: 3px solid red;
        //     border-radius: 3px;
        // }
    // }
    .red-dot {
        position: absolute;
        margin-left: -0.4rem;
        margin-top: .8rem;
        border: 3px solid red;
        border-radius: 3px;
    }
    // .el-icon-set-up {
    //     margin: {
    //         left: 0.6rem;
    //         right: auto;
    //     }
    // }
    // img {
    //     width: 25px;
    //     margin-right: auto;
    //     &:hover {
    //         cursor: pointer;
    //     }
    // }
}
// .setting-panel {
//     height: 60px;
// }
// .slide-enter-active,
// .slide-leave-active {
//     transition: height 0.1s linear;
// }
// .slide-enter,
// .slide-leave {
//     height: 0px;
// }
// .fixed-header {
//     position: fixed;
//     top: 0;
//     right: 0;
//     left: 0;
//     z-index: 11;
// }
// @keyframes flux {
//     0%, 100% {
//         text-shadow: 0 0 1vw #10ff4c, 0 0 3vw #1041FF, 0 0 10vw #1041FF, 0 0 10vw #1041FF, 0 0 .4vw #8BFDFE, .5vw .5vw .1vw #147280;
//         color: #03C03C;
//     }
//     50% {
//         text-shadow: 0 0 .5vw #024218, 0 0 1.5vw #024713, 0 0 5vw #023812, 0 0 5vw #012707, 0 0 .2vw #022201, .5vw .5vw .1vw #011a06;
//         color: #179E05;
//     }
// }
</style>