<template>
  <footer class="footer">
    <router-link class="footerTab" to="/">
      <img src="../../../static/img/tab/home.png" alt="">
      <span>首页</span>
    </router-link>
    <router-link class="footerTab" to="/profile">
      <img src="../../../static/img/tab/profile.png" alt="">
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
