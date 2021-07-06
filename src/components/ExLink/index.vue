<template>
    <a :href="href" :target="target"><slot/></a>
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
    }
}
</script>