<template>
    <div>
        <top-bar/>
        <app-main/>
        <footer-bar/>
    </div>
</template>

<script>
import TopBar from './components/TopBar';
import AppMain from './components/AppMain';
import FooterBar from './components/Footer';

export default {
    components: {
        TopBar,
        AppMain,
        FooterBar,
    },
}
</script>