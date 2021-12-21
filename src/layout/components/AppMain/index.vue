<template>
    <div class="main-container">
        <navigation-bar v-show="showNav"/>
        <router-view style="margin: 0 1rem;"/>
        <side-bar v-show="showSideBar"/>
        <back-top/>
    </div>
</template>

<script>
import SideBar from './SideBar';
import NavigationBar from './NavigationBar';
import BackTop from '@/components/BackTop';

export default {
    components: {
        BackTop,
        SideBar,
        NavigationBar,
    },
    computed: {
        showNav() {
            return !this.$route.meta.hideNav;
        },
        showSideBar() {
            return !this.$route.meta.hideSideBar;
        }
    }
}
</script>

<style lang="scss" scoped>
.main-container {
    display: flex;
    justify-content: center;
    width: 100%;
    min-height: calc(100vh - 56px - 80px);
    margin-top: 56px;
    padding: 16px 0;
}
</style>