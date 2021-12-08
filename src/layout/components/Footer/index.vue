<template>
    <footer class="footer">
        <span class="logo">BotClub</span>
        <span class="copyright"> &copy; {{currentYear}} Created by ASCII13</span>
        <div style="display: inline-block; float: right;">
            <a class="contact mail" href="mailto:476747909@qq.com">E-mail</a>
            <a class="contact github" href="https://github.com/ASCII13/BotClub" target="_blank">GitHub</a>
        </div>
    </footer>
</template>

<script>
export default {
    computed: {
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
    background-color: #353535;
    color: darkgray;
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
    }
    .mail {
        width: 12rem;
        background-color: chocolate;
    }
    .github {
        width: 10rem;
        background-color: cadetblue;
    }
}
</style>