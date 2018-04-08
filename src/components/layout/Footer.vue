<template>
  <footer class="footer">
    <router-link class="footerTab" to="/">
      <img src="../../../static/img/tab/Combined-Shape@2x.png" v-if="$route.name !== 'home'" role="tab" alt="tab">
      <img src="../../../static/img/tab/Group-71@2x.png" role="tab" v-else alt="tab">
      <span>首页</span>
    </router-link>
    <router-link class="footerTab" to="/profile">
      <img src="../../../static/img/tab/Group-2@2x.png" v-if="$route.name !== 'profile'" role="profile" alt="tab">
      <img src="../../../static/img/tab/Group-8@2x.png" v-else role="profile" alt="tab">
      <span>我的</span>
    </router-link>
  </footer>
</template>

<script>
  export default {
    name: '',
    data () {
      return {}
    },
    created () {}
  }
</script>

<style type="text/scss" lang="scss">
@import '../../styles/footer.scss';
</style>
