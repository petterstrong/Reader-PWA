<template>
  <div id="app">
    <main>
      <router-view></router-view>
    </main>
    <foot v-if="$route.meta.root"/>
  </div>
</template>

<script>
import Foot from 'src/components/layout/Footer.vue'
export default {
  name: 'app',
  components: {Foot}
}
</script>

<style type="text/scss" lang="scss">
</style>
