<template>
<div class="recommend">
 <div v-for="item in recommends" class="recommend-item"><!--recommends是一个数组，有四个对象，要动态遍历里面的所有对象-->
   <a :href="item.link"><!--动态绑定-->
     <img :src="item.image" alt="">
     <div>{{item.title}}</div>
   </a>
 </div>
</div>
</template>

<script>
  export default {
    name: "RecommendView",
    props:{
      recommends:{
        type:Array,
        default(){        //获取Home.vue里面的recommends数据
          return []
        }
      }
    }
  }
</script>

<style scoped>
.recommend {
  display: flex;
  width: 100%;
  text-align: center;
  font-size:12px;
  padding: 10px 0 20px;
  border-bottom: 8px solid #eeeeee;
}
.recommend-item {
  flex: 1;
}
  .recommend-item img {
    width: 70px;
    height: 65px;
    margin-bottom: 10px;
  }
</style>
