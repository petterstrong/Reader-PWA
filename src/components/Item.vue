<template>
  <div class="item" :class="[itemType]" @click="$emit('tap')">
    <div class="item-media-single">
      <div class="item-media">
        <div class="item-title">今天春分，妈妈们少吵架少 生气多养肝才是王道</div>
        <div class="item-actions">
          <span>宝宝树</span>
          <span>123阅读</span>
          <span>321评论</span>
        </div>
      </div>
      <div class="image-banner">
        <div class="images m-0"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'item',
    props: {
      aid: String,
      title: String,
      /**
       * multiple/single/banner/plain
       */
      itemType: {
        type: String,
        default: 'multiple'
      },
      comments: String,
      source: String,
      read: [String, Number],
      createdAt: String,
      closeable: Boolean
    },
    data () {
      return {}
    },
    created () {}
  }
</script>

<style type="text/scss" lang="scss">
@import '../styles/variables';
.item {
  padding: px2rem($base-item-padding);
  position: relative;
  background-color: #ffffff;
  &:after {
    position: absolute;
    bottom: 0;
    left: $base-item-padding;
    right: $base-item-padding;
    content: '';
    display: block;
    height: px2rem($base-item-border-depth);
    background:rgba(232,232,232,1);
  }
  .item-title {
    font-size: px2rem($base-item-title-font-size);
    line-height: px2rem($base-item-title-lh);
    color: $base-item-title-font-color;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp:2;
  }
  .item-media {
    margin-right: px2rem($base-item-media-mr);
  }
  .item-media-single {
    display: flex;
  }
  .item-actions {
    color: #B8B8B8;
    font-size: px2rem(26);
    margin-top: px2rem(20);
    span{
      margin-right: px2rem(20);
    }
  }
  .image-banner {
    .images {
      display: inline-block;
      height: px2rem($base-item-image-height);
      width: px2rem($base-item-image-width);
      border-radius: px2rem(8);
      background-color: #ddd;
    }
  }
}
</style>
