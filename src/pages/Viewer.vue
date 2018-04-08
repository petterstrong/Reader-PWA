<template>
  <div class="viewer">
    <iframe src="https://wx.gui-quan.com/link?url=https%3A%2F%2Fmp.weixin.qq.com%2Fs%2FgysxAP2K8a90Tx80SCLiJg"
            frameborder="0" style="overflow:hidden;height:100%;width:100%" height="100%" width="100%"
            id="web-view"></iframe>
    <div class="article-recommends">
      <h3>相关推荐</h3>
      <item @tap="tapHandler"></item>
    </div>
    <div class="articles-entry">
      <h3>
        <span>广告</span>
      </h3>
      <div class="entry-content"></div>
    </div>
    <div class="article-actions">
      <div class="action-item" role="tab">
        <img src="../../static/img/icons/ic_like@2x.png" alt="like">
        <p>1329</p>
      </div>
      <div class="action-item" role="tab">
        <img src="../../static/img/icons/Group-3@2x.png" alt="like">
        <p>1329</p>
      </div>
      <div class="action-item" role="tab">
        <img src="../../static/img/icons/Group-5@2x.png" alt="like">
        <p>1329</p>
      </div>
    </div>
  </div>
</template>

<script>
  import Item from 'src/components/Item.vue'
  export default {
    name: '',
    components: {Item},
    data () {
      return {}
    },
    created () {},
    mounted () {
      document.body.classList.add('gray')
    },
    destroyed () {
      document.body.classList.remove('gray')
    },
    methods: {
      tapHandler () {
        wx.miniProgram.navigateTo({
          url: './pages/profile'
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss">
  @import '../styles/variables';
  .viewer {
    height: 100%;
  }
  #web-view {
    width: 100%;
    height: auto;
  }
  .article-recommends h3, .articles-entry h3 {
    color: $base-article-front-color;
    font-size: px2rem(32);
    padding: px2rem(24) px2rem($base-item-padding);
  }
  .articles-entry {
    padding: 0 px2rem($base-item-padding) px2rem($base-item-padding);
    margin-bottom: px2rem(220);
    h3 {
      text-align: center;
      position: relative;
      &:before {
        content: '';
        position: absolute;
        height: px2rem(2);
        left: 0;
        width: 100%;
        top: 50%;
        background-color: $base-item-border-color;
      }
      span {
        position: relative;
        padding: 0 px2rem(8);
        z-index: 2;
        background-color: $base-article-bg;
      }
    }
    .entry-content {
      height: px2rem(380);
      background-color: white;
      border-radius: px2rem(8);
    }
  }
  .article-actions {
    position: fixed;
    background-color: #fff;
    display: flex;
    height: px2rem(100);
    width: 100%;
    bottom: 0;
    left: 0;
    z-index: 10;
    padding-top: px2rem(12);
    color: #b8b8b8;
    font-size: px2rem(24);
    text-align: center;
    box-shadow: 0 0 10px rgba(0,0,0,.25);
    img {
      height: px2rem(48);
    }
    .action-item {
      flex: 1;
    }
  }
</style>
