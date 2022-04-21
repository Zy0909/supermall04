<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad"><!--轮播图加载比较慢，影响offsetSet属性计算，要监听这里的图片 -->
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper,SwiperItem} from 'components/common/swiper';
  export default {
    name: "HomeSwiper",
    props: {
      banners:{
        type:Array, //类型是对象或数组时，默认值必须时是函数
        default(){
          return []
        }
      }
    },
    data(){
      return {
        isLoad:false
      }
    },
    components:{
      Swiper,
      SwiperItem
    },
    methods:{
      imageLoad(){
        //console.log('----');
        if(!this.isLoad){
        this.$emit('swiperImageLoad')
        this.isLoad=true //只需计算一次offsetTop
        }
      }
    }
  }
</script>

<style scoped>

</style>
