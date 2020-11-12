<template>
    <div class="back-top" v-show="show" @click="backTop"><i class="el-icon-caret-top"></i></div>
</template>

<script>
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
    destroyed() {
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
    display: inline-block;
    text-align: center;
    line-height: 50px;
    font-size: 20px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>