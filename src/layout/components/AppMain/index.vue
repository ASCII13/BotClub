<template>
    <div class="main-container" style="padding: 0 16px;">
        <router-view></router-view>
        <back-top/>
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