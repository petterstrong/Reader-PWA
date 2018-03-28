<template>
  <router-link :to="{name: 'item', params: {aid: '123'}}" class="listItem">
    <div class="listMedia">
    </div>
    <div class="listDesc">
      <div class="listDescText">
      </div>
      <div class="listDescAction">
      </div>
    </div>
  </router-link>
</template>

<script>
  export default {
    name: 'list-item',
    props: {
    },
    data () {
      return {}
    },
    created () {}
  }
</script>

<style type="text/scss" lang="scss">
.listItem {
  display: flex;
  padding: .35rem;
  border-bottom: 1px solid #eee;
  .listMedia {
    height: 1.8rem;
    height: 18vw;
    width: 1.8rem;
    width: 18vw;
    background-color: #f4f4f4;
    border-radius: .25rem;
  }
  .listDesc {
    display: flex;
    flex: 1;
    margin-left: .35rem;
    flex-direction: column;
  }
  .listDescText {
    height: 1.2rem;
    height: 12vw;
    background-color: #f4f4f4;
    border-radius: .15rem;
  }
  .listDescAction {
    display: flex;
    margin-top: .25rem;
    &:before {
      content: '';
      background-color: #f4f4f4;
      display: inline-block;
      height: .35rem;
      width: .85rem;
    }
    &:after {
      content: '';
      background-color: #f4f4f4;
      display: inline-block;
      height: .35rem;
      width: .65rem;
      border-radius: 50px 50px 0px 0px;
      margin-left: .35rem;
    }
  }
}
</style>
