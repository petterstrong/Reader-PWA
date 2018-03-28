<template>
  <div id="app">
    <main>
      <router-view></router-view>
    </main>
    <foot/>
  </div>
</template>

<script>
import Foot from '@/components/layout/Footer.vue'
export default {
  name: 'app',
  components: {Foot}
}
</script>

<style type="text/scss" lang="scss">

</style>
