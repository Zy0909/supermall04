<template>
<div>
  <nav-bar>
    <div slot="left" class="back" @click="backClick">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
   <div slot="center" class="title">
     <div v-for="(item,index) in titles"
          class="title-item"
          :class="{active:index==currentIndex}"
          @click="titleClick(index)">{{item}}</div><!-- 第一个是红色，然后添加点击事件，点击谁，谁变红-->
   </div>
  </nav-bar>
</div>
</template>

<script>
 import NavBar from "components/common/navbar/NavBar";
  export default {
    name:"DatailNavBar",
    components:{
     NavBar
    },
    data(){
      return {
        titles:['商品','参数','评论','推荐'],
        currentIndex:0
      }
    },
    methods:{
      titleClick(index){
        this.currentIndex=index;
        this.$emit('titleClick',index);//把点击事件和index传出去
      },
      backClick(){
        this.$router.go(-1);
      }
    }
  }
</script>

<style scoped>
.title {
  display: flex;
}
  .title-item {
    flex: 1;
    font-size: 13px;
  }
  .active {
    color: var(--color-high-text);
  }
  .back img{
    margin-top: 12px;
  }
</style>
