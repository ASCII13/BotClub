<template>
    <footer class="footer" :class="{ 'dark-mode': mode === 'dark' }">
        <span class="logo">BotClub</span>
        <span class="copyright"> &copy; {{currentYear}} Created by ASCII13</span>
        <div style="float: right; height: 80px;">
            <a class="contact mail" href="mailto:476747909@qq.com">E-mail</a>
            <a class="contact github" href="https://github.com/ASCII13/BotClub" target="_blank">GitHub</a>
        </div>
    </footer>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    computed: {
        ...mapGetters(['mode']),
        currentYear() {
            return new Date().getFullYear();
        }
    },
    // methods: {
    //     navigateTo(dst) {
    //         let url = '';
    //         switch (dst) {
    //             case 'github':
    //                 url = 'https://github.com/ASCII13/BotClub';
    //                 return window.open(url, '_blank');
    //             case 'email':
    //                 url = 'mailto:476747909@qq.com';
    //                 return window.location.href = url;
    //         }
    //     }
    // }
}
</script>

<style lang="scss" scoped>
.footer {
    height: 80px;
    line-height: 80px;
    padding: 0 5rem;
    background-color: darkgray;
    font-family: Oswald;
    .logo {
        font-weight: bold;
    }
    .copyright {
        font: {
            style: italic;
            weight: 500;
        }
    }
    .contact {
        display: inline-block;
        line-height: 80px;
        font-size: 1.3rem;
        text-align: center;
        border-radius: 4px;
        color: white;
    }
    .mail {
        width: 12rem;
        background-color: #4b8e69;
    }
    .github {
        width: 10rem;
        background-color: black;
    }
    &.dark-mode {
        color: $textColorDark;
        background-color: $elementBgDark;
        .contact {
            color: inherit;
        }
    }
}
</style>