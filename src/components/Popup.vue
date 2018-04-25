<template>
  <div class="popup-wrapper" :class="{'top': top}">
    <transition name="popup">
      <div class="popup-mask" @click="_close" v-if="show"></div>
    </transition>
    <transition name="popup">
      <div class="popup-content" :class="{'hasFoot': !!$slots.footer}" @click.stop.prevent v-if="show">
        <!--关闭按钮-->
        <div class="close-btn" @click="_close" v-if="showClose">
          <i class="ion-close-round" data-icon="ion"></i>
        </div>
        <!--内容-->
        <div class="popup-body">
          <slot name="body"></slot>
        </div>
        <div class="popup-footer" v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    props: {
      show: {
        type: Boolean,
        default: false
      },
      /**
       * size: full
       */
      size: {
        type: String,
        default: ''
      },
      showClose: {
        type: Boolean,
        default: true
      },
      top: {
        type: Boolean,
        default: false
      }
    },
    mounted  () {
    },
    watch: {
      show: function (val) {
        if (val) {
          document.body.style.overflow = 'hidden'
        } else {
          document.body.style.overflow = ''
        }
      }
    },
    methods: {
      _close () {
        this.$emit('close')
      }
    }
  }
</script>


<style type="text/scss" lang="scss" scoped>
  @import '../styles/variables';

  .popup-enter {
    opacity: 0;
  }

  .popup-leave-active {
    opacity: 0;
  }
  .popup-enter-active, .popup-leave-active  {
    transition: all .3s ease;
  }

  .popup-enter, .popup-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    transform: scale(1.1);
    transform-origin: center center;
  }

  .popup-mask {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0,0,0,.5);
    opacity: .5;
    transition: opacity .3s ease;
    @media (min-height: 768px) {
      -webkit-tap-highlight-color: transparent;
    }
  }

  .popup-content {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    backdrop-filter: blur(10px) brightness(1.4);
    background-color: rgba(255,255,255,.98);
    position: fixed;
    padding: 0;
    left: 0;
    left: calc(100vw - 100%);
    right: 0;
    bottom: 0;
    z-index: 1002;
    overflow: auto;
    width: 100%;
    max-width: 640px;
    min-height: 20vh;
    max-height: 100vh;
    margin: 0 auto;
    border-radius: 2px;
    transition: all .3s ease;
    box-shadow: $dp-2;
    border-radius: px2rem(16) px2rem(16) 0 0;
    // 关闭按钮
    .close-btn {
      $close-size: 1.5em;
      position: absolute;
      width: $close-size;
      height: $close-size;
      color: #fff;
      font-size: 2rem;
      text-align: center;
      cursor: pointer;
      transition: .2s;
      background-color: #aaa;
      border: none;
      top: 0;
      right: 0;
      border-radius: 0;
      z-index: 10;
      padding-left: $close-size / 5;
      padding-top: $close-size / 8;
      line-height: 1;
      border-bottom-left-radius: 100px;
      &:hover {
        background-color: #bbb;
      }
    }

  }
  @media (min-width: 601px) {
    .popup-content {
      top:3rem;
      bottom: auto;
    }
  }

  @media (max-width: 600px) {
    .popup-content {
      margin-top:auto
    }

    .popup-enter.popup-content,
    .popup-leave-active.popup-content {
      -webkit-transform: translateY(100%);
      transform: translateY(100%);
    }
  }
  .popup-content {
    // 内容
    .popup-body {
      padding: px2rem(60) 0;
      max-height: 100%;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }
    // 底部内容
    .popup-footer {
      position: absolute;
      bottom: 0;
      width: 100%;
      min-height: px2rem(100);
      border-top: 1px solid #eee;
      padding: 5px 0;
      background-color: rgba(255 ,255, 255,.85);
      z-index: 200;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &.hasFoot {
      padding-bottom: px2rem(100);
    }
  }
  .popup-wrapper.top {
    .popup-content {
      top: 0;
    }
  }

</style>
