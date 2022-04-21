<template>
  <div id="app">
    <keep-alive exclude="Detail"><!--detail要不停获取新的id，每个id对应的轮播图等数据不一样 -->
    <router-view></router-view>
    </keep-alive>
   <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabBar/MainTabBar.vue';
export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
@import "assets/css/base.css";  /*引用*/
</style>
