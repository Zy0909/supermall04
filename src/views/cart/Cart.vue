<template>
<div class="cart">
  <!--导航-->
<nav-bar class="nav-bar">
  <div slot="center">购物车({{cartLength}})</div>
</nav-bar>
  <!--商品列表-->
  <cart-list ></cart-list>

  <!--底部汇总-->
  <cart-bottom-bar></cart-bottom-bar>
</div>
</template>

<script>
  import CartBottomBar from "./childComps/CartBottomBar";
  import NavBar from "components/common/navbar/NavBar";
  import CartList from "./childComps/CartList";
  import {mapGetters} from "vuex"  //可以直接拿到getters中的方法，作为计算属性
  export default {
    name: "Cart",
    components:{
      NavBar,
      CartList,
      CartBottomBar
    },
    computed:{
      //两种语法
      ...mapGetters(['cartLength'])

    }
  }
</script>

<style scoped>
  .cart {
   height: 100vh;
  }
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
}
</style>
