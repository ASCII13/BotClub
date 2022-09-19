<template>
    <button :disabled="disabled" :class="{ 'dark': mode === 'dark' }">
        <i v-show="loading" class="el-icon-loading"/>
        {{ text }}
    </button>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'LoadButton',
    props: {
        text: {
            type: String,
            required: true
        },
        loading: {
            type: Boolean,
            default:false
        },
        disabled: {
            type: Boolean
        }
    },
    computed: {
        ...mapGetters(['mode']),
    }

}
</script>

<style lang="scss" scoped>
button {
    padding: .5rem;
    border: 1px solid;
}
.dark {
    color: $textColorDark;
}
</style>