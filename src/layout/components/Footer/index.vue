<template>
    <div class="footer-container">
        <div class="contact">
            <el-avatar :src="require('@/assets/github.svg')" shape="circle" @click.native="navigateTo('github')"></el-avatar>
            <el-avatar :src="require('@/assets/email.svg')" shape="circle" @click.native="navigateTo('email')"></el-avatar>
        </div>
        <div class="info">
            <div>Copyright © {{ getCurrentYear }} ASCII13</div>
            <div>Made with love, Vue and WANANDROID API</div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        getCurrentYear() {
            return new Date().getFullYear();
        }
    },
    methods: {
        navigateTo(page) {
            let url = '';
            switch (page) {
                case 'github':
                    url = 'https://github.com/ASCII13/VAndroid';
                    window.open(url, '_blank');
                    break;

                case 'email':
                    url = 'mailto:476747909@qq.com';
                    window.location.href = url;
                    break;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.footer-container {
    width: 100%;
    height: 200px;
    background-color: #d3d6da;
    color: #303133;
    font-size: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.el-avatar {
    width: 30px;
    height: 30px;
    background-color: transparent;

    &:not(:last-child) {
        margin-right: 10px;
    }
}

.info {
    marigin-top: 1rem;
    text-align: center;
    line-height: 25px;
}
</style>