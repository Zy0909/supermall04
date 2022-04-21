<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll"> <!--滚动要有三个条件：固定高度，不然会被内容撑的很大，滚动不了-->
    <cart-list-item v-for="(item,index) in cartList"
                    :product="item"
                    :key="index"> </cart-list-item>
    </scroll>
  </div>
</template>

<script>
  import CartListItem from "./CartListItem";
  import Scroll from "components/common/scroll/Scroll";
  import {mapGetters} from 'vuex'
  export default {
    name: "CartList",
    components:{
      Scroll,
      CartListItem
    },
    computed:{
      ...mapGetters(['cartList'])//将内容映射到这里
    },
    activated() {
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .cart-list{
    height: calc(100vh - 44px - 58px - 40px);
  }
.content {
  height: 100%;
  overflow: hidden; /*用鼠标不能滚动*/
}
</style>
