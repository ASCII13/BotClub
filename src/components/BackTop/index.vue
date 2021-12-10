<template>
    <div class="back-top" v-show="show" @click="backTop">
        <img v-if="showSuprise" src="@/assets/christmas/back-top.svg">
        <i v-else class="el-icon-caret-top"></i>
    </div>
</template>

<script>
import { isChristmas } from "@/utils/suprise";
export default {
    data() {
        return {
            show: false,
            scrollView: document.documentElement || document.body,
        }
    },
    mounted() {
        document.addEventListener('scroll', this.onScroll);
    },
    beforeDestroy() {
        document.removeEventListener('scroll', this.onScroll);
    },
    methods: {
        onScroll() {
            if (this.scrollView.scrollTop >= 888) {
                this.show = true;
            } else {
                this.show = false;
            }
        },
        backTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    },
    computed: {
        showSuprise() {
            return isChristmas();
        },
    }
}
</script>

<style lang="scss" scoped>
.back-top {
    position: fixed;
    bottom: 12rem;
    right: 6rem;
    width: 50px;
    height: 50px;
    border-radius: 25px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    &:hover {
        cursor: pointer;
    }
    & > i {
        font-size: 20px;
    }
}
</style>