<template>
  <div class="viewer">
    <div id="viewer_content" v-html="content"></div>
    <div class="article-recommends" v-if="false">
      <h3>相关推荐</h3>
      <item></item>
    </div>
    <div class="articles-entry" v-if="false">
      <h3>
        <span>广告</span>
      </h3>
      <div class="entry-content"></div>
    </div>
    <popup :show="shareModal" :showClose="false" @close="shareModal = false" >
      <div class="share-content" slot="body">
        <div class="share-cover">
          <img src="../../static/img/icons/guide.png" alt="guide">
        </div>
        <div class="share-tip">
          请在微信小程序搜索
          <p>“妈咪爱看”</p>
        </div>
        <div class="qr_code">
          <img src="http://o7diglftu.qnssl.com/media/upload/Fvc74KyID7iAyQvOsvyiYk8uYPng" alt="">
          <div class="qr_code-desc">
            <h3>长按识别二维码</h3>
            <p>进入 <b class="text-primary">“妈咪爱看”</b></p>
          </div>
        </div>
      </div>
    </popup>
    <div class="article-actions">
      <div class="action-item " role="tab" @click="shareModal = true">
        <img src="../../static/img/icons/home.png" alt="like">
        <p>返回首页</p>
      </div>
    </div>
    <toast message="加载中..." :value="loading" :lock="true" closeable>
      <div class="loading-icon text-loading">
        <i class="fa fa-spinner" aria-hidden="true"></i>
      </div>
    </toast>
  </div>
</template>

<script>
  import Item from 'src/components/Item.vue'
  import Popup from 'src/components/Popup.vue'
  import Toast from 'src/components/common/Toast/Toast.vue'
  import api from 'src/api'
  export default {
    name: '',
    components: {Item, Popup, Toast},
    data () {
      return {
        url: '',
        showModal: false,
        shareModal: false,
        content: '',
        loading: false
      }
    },
    created () {},
    mounted () {
      let {url} = this.$route.query
      document.body.classList.add('gray')
      if (url) {
        this.fetchArticle(url)
      }
    },
    destroyed () {
      document.body.classList.remove('gray')
    },
    methods: {
      sendInvitation () {
      },
      shareContent () {
        this.showModal = true
      },
      getShareCover () {
        this.showModal = false
        this.shareModal = true
      },
      fetchArticle (url) {
        this.loading = true
        url = encodeURIComponent(url)
        api.fetchArticle(url).then(data => {
          this.content = data
          this.loading = false
        })
      }
    }
  }
</script>

<style type="text/scss" lang="scss">
  @import '../styles/variables';
  @import '../styles/article';
  @import '../styles/content';
</style>
