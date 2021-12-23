<template>
    <header class="top-bar" :class="{ 'dark-mode': mode === 'dark' }">
        <router-link class="logo" to="/">BC</router-link>
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
                <router-link v-if="!cookie" to="/auth">登录</router-link>
                <template v-else>
                    <span class="nickname">{{ user.name }}
                        <i class="el-icon-caret-bottom"></i>
                    </span>
                    <ul class="menu">
                        <li @click="signOut">退出登录</li>
                    </ul>
                </template>
            </div>
            <router-link to="/notifications" v-if="cookie">
                <span class="el-icon-bell"></span>
                <span class="red-dot" v-if="visible.redDot"></span>
            </router-link>
        </div>
        <!-- <i class="el-icon-set-up" @click="visible.setting = !visible.setting"></i> -->
        <!-- <img :src="require(`@/assets/mode-${mode}.svg`)" @click="isDark = !isDark" /> -->
    </header>
        <!-- <transition name="slide">
            <setting class="setting-panel" v-show="visible.setting" :fixedHeader="fixedHeader"></setting>
        </transition> -->
</template>

<script>
// import Setting from './Setting';
import { mapGetters } from 'vuex';
import { fetchHotWords } from '@/api/search';

export default {
    data() {
        return {
            keywords: '',
            hotWords: [],
            visible: {
                setting: false,
                hotWords: false,
                redDot: true,
            },
        }
    },
    mounted() {
        document.addEventListener('click', e => {
            if (e.target.className === 'el-input__inner' && e.target.placeholder === '多个关键字用空格隔开') {
                this.visible.hotWords = true;
            } else {
                this.visible.hotWords = false;
            }
        })
    },
    computed: {
        ...mapGetters([
            'user',
            'mode',
            'cookie',
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
        search() {
            if (!this.keywords.trim()) return;

            this.visible.hotWords = false;
            this.$store.dispatch('app/setKeywords', this.keywords);

            if (this.$route.path === '/search-result/index') return;
            this.$router.push('/search-result');
        },
        getHotWords() {
            const hotWords = this.hotWords;
            if (hotWords && hotWords.length) return;

            fetchHotWords().then(res => {
                if (res.data && res.data.length) {
                    this.hotWords = res.data;
                }
            });
        },
        onClickHotWord(keywords) {
            this.keywords = keywords;
            this.search();
        },
        changeMode(mode) {
            this.$store.dispatch('app/setMode', mode);
        },
        signOut() {
            this.$store.dispatch('user/logout').then(() => {
                if (this.$route.meta.auth) {
                    this.$router.replace('/auth');
                } else {
                    window.location.reload();
                }
            });
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
        display: block;
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
            height: 56px;
            min-width: 3rem;
            line-height: 56px;
            text-align: center;
        }
        .nickname {
            display: inline-block;
            min-width: 6rem;
            height: 56px;
            line-height: 56px;
            text-align: center;
            overflow: hidden;
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
            width: 10rem;
            z-index: 11;
            list-style: none;
            border-radius: 4px;
            padding-inline-start: 1rem;
            box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
            li {
                line-height: 2.6rem;
                font-size: .9rem;
                &:hover {
                    color: $primaryColor;
                }
            }
        }
    }
    .el-icon-bell,
    .el-icon-set-up {
        width: 25px;
        line-height: 56px;
        font-size: 20px;
        text-align: center;
        color: #606266;
    }
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