<template>
    <div class="side-bar-container">
        <personal-info></personal-info>
        <commonly-used-site></commonly-used-site>
    </div>
</template>

<script>
import PersonalInfo from './components/Personal'
import CommonlyUsedSite from './components/CommonlyUsedSite'

export default {
    components: {
        PersonalInfo,
        CommonlyUsedSite,
    }
}
</script>

<style lang="scss" scoped>
.side-bar-container {
    display: flex;
    flex-direction: column;

    & > :not(:first-child) {
        margin-top: 16px;
    }
}
</style>