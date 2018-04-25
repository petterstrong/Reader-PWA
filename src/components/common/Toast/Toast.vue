<template>
  <transition :name="position === 'top' ? 'top' : 'fade'">
    <div ref="ild-toast" :class="['ild-toast', {clickable}, className]"
         v-if="value" @click="_close">
      <div :class="['toast-wrapper', position, {blur: blur, isIOS}]">
        <div class="icon-wrap">
          <i class="material-icons" v-if="icon.type === 'material'" data-icon="material">{{icon.content}}</i>
          <i :class="icon.content" v-if="icon.type === 'ionicon'" data-icon="ion"></i>
        </div>
        <slot></slot>
        <p class="toast-message" v-html="message" v-if="message">
        </p>
      </div>
    </div>
  </transition>
</template>

<script type="text/babel">
  let scrollTop = 0
  export default {
    props: {
      // v-model 控制
      value: {
        default: false,
        type: Boolean
      },
      /*
      * bottom middle top
      * */
      position: {
        default: 'middle',
        type: String
      },
      // 是否可以点击mask关闭
      closeable: {
        default: false,
        type: Boolean
      },
      // 是否可以点击到，false时为可穿透点击
      clickable: {
        default: true,
        type: Boolean
      },
      message: {
        default: '',
        type: String
      },
      className: {
        default: '',
        type: String
      },
      icon: {
        default () {
          return {}
        },
        type: Object
      },
      // 是否阻止移动端滑动穿透
      lock: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        show: false,
        blur: false,
        isComponent: true
      }
    },
    computed: {
      isIOS () {
        return window.isIOS
      }
    },
    methods: {
      _close () {
        if (this.closeable) {
          if (this.isComponent) {
          // 正常组件调用
            this.show = false
          } else {
          // 由Toast方法调用
            this.value = false
          }
          this.$emit('close')
        }
      }
    },
    created () {
    },
    mounted () {},
    watch: {
      value (val) {
        this.show = val
        if (this.lock) {
          if (val) {
            scrollTop = document.scrollingElement.scrollTop
            document.body.classList.add('overflow-hidden')
            document.body.style.top = -`${scrollTop}px`
          } else {
            document.body.classList.remove('overflow-hidden')
            document.scrollingElement.scrollTop = scrollTop
          }
        }
      },
      show (val) {
        this.$emit('input', val)
      }
    }
  }
</script>

<style type="text/scss" lang="scss">
  @import '../../../styles/variables';
  body.overflow-hidden {
    position: fixed;
    width: 100%;
  }
  .ild-toast {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow-y: scroll;
    .toast-wrapper {
      position: absolute;
      padding: 6px 16px 16px 16px;
      border-radius: 5px;
      max-width: 80%;
      text-align: center;
      background-color: rgba(10, 10, 10, 0.6);
      transform: translate(-50%, 0);
      color: #ffffff;
      width: 9.6em;
      min-height: 9.6em;
      &.isIOS {
        background-color: rgba(12, 12, 12, 0.5);
        -webkit-backdrop-filter: blur(10px) brightness(1.4);
      }
      &>* {
        margin: 10px auto 0;
        text-align: center;
      }
      .toast-message {
        font-size: 16px;
        font-weight: 500;
      }
      &.middle {
        top: px2rem(360);
        left: 50%;
      }
      &.top {
        top: 0;
        left: 0;
        width: 100%;
        max-width: 100%;
        transition: all .3s ease;
        transform: translate(0, 0%);
        -webkit-border-radius: 0;
        -moz-border-radius: 0;
        border-radius: 0;
        padding: 8px 0 16px;
      }
      &.bottom {
        bottom: 10%;
        left: 50%;
      }
    }
    &:not(.clickable) {
      pointer-events: none;
    }
  }

  /*message*/
  .ild-message {
    .toast-wrapper {
      background-color: rgba(255, 255, 255, .94);
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      .icon-wrap {
        margin-right: 6px;
      }
      i {
        display: block;
        font-size: 20px;
        &:before {
          display: block;
        }
      }
      &>* {
        margin: 10px 0 0;
      }
    }
    &.success .icon-wrap {
      color: $color-success;
    }
    &.warning .icon-wrap {
      color: $color-warning;
    }
    &.error .icon-wrap {
      color: $color-error;
    }
    &.info .icon-wrap {
      color: $color-info;
    }
  }

  /*transitions*/

  .fade-leave-active, .fade-enter {
    opacity: 0;
  }
  .fade-enter-active, .fade-leave-active  {
    transition: all .3s ease;
  }

  .top-leave-active, .top-enter {
    transform: translateX(0);
    .toast-wrapper {
      transform: translate(0, -100%)!important;
      top: 0;
      left: 0;
      width: 100%;
      max-width: 100%;
    }
  }
  .top-enter-active, .top-leave-active  {
    transition: all .3s ease;
    .toast-wrapper {
      transform: translate(0, -100%)!important;
      transition: all .3s ease;
    }
  }
</style>
