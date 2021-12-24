<template>
    <button :disabled="disabled">
        <i v-show="loading" class="el-icon-loading"/>
        {{ text }}
    </button>
</template>

<script>
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

}
</script>

<style lang="scss" scoped>
button {
    padding: .5rem;
    border: 1px solid;
}
</style>