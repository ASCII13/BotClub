<template>
    <div class="main-container">
        <router-view></router-view>
        <back-top></back-top>
    </div>
</template>

<script>
import BackTop from '@/components/BackTop';

export default {
    components: {
        BackTop,
    }
}
</script>

<style lang="scss" scoped>
.main-container {
    padding: 0 16px;
}
</style>