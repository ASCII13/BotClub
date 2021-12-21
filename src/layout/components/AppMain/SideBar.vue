<template>
    <div style="width: 300px;">
        <personal/>
        <router-view name="sidebar" style="margin-top: 1rem;"/>
    </div>
</template>

<script>
import Personal from './Personal';
export default {
    components: {
        Personal,
    }
}
</script>