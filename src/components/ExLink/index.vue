<template>
    <a
        v-if="!router"
        :href="!href ? null : href"
        :target="!href ? null : target"
        :class="{'hyperlinks': underlined, 'active': current, 'dark': mode === 'dark'}">
        <slot/>
    </a>
    <router-link v-else :class="{'hyperlinks': underlined}" :to="href"><slot/></router-link>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'ExLink',
    props: {
        href: {
            type: String,
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
        },
        current: {
            type: Boolean,
        }
    },
    computed: {
        ...mapGetters(['mode']),
    }
}
</script>

<style lang="scss" scoped>
.base {
    background: linear-gradient(90deg, #69a530, #69a530);
    background-repeat: no-repeat;
    background-position: 0 100%;
}
.hyperlinks {
    @extend .base;
    background-size: 0 0.3rem;
    transition: 0.2s all;

    &:hover {
        background-size: 100% 0.3rem;
    }
}
.active {
    @extend .base;
    background-size: 100% 0.3rem;
}
.dark {
    color: $textColorDark;
}
</style>