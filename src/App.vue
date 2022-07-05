<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  created() {
    history.scrollRestoration = 'manual';
  }
}
</script>