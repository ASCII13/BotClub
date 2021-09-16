<template>
    <a v-if="!router" :href="href" :target="target" :class="{'hyperlinks': underlined}"><slot/></a>
    <router-link v-else :class="{'hyperlinks': underlined}" :to="href"><slot/></router-link>
</template>

<script>
export default {
    name: 'ExLink',
    props: {
        href: {
            type: String,
            required: true
        },
        target: {
            type: String,
            default: '_blank'
        },
        underlined: {
            type: Boolean,
            default: true
        },
        router: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="scss" scoped>
.hyperlinks {
    background: linear-gradient(90deg, #69a530, #69a530);
    background-size: 0 0.3rem;
    background-repeat: no-repeat;
    background-position: 0 100%;
    transition: 0.2s all;

    &:hover {
        background-size: 100% 0.3rem;
    }
}
</style>