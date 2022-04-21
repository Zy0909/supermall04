<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :goods-item="item"></goods-list-item><!--拿到item，把item赋值给goods-item对象 -->
   <!--拿到在home.vue赋值后的goods -->

  </div>
</template>

<script>
  import GoodsListItem from "./GoodsListItem"; //引入小组件item
  export default {
    name: "GoodsList",
    components:{
      GoodsListItem
    },
    props:{
      goods:{ //定义一个goods属性，在home.vue里面给goods属性赋值
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap; /*一行展示不下，换行展示*/
  justify-content: space-evenly; /*主轴上的对齐方式*/
}
</style>
