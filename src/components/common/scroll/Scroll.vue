<template>
  <div class="wrapper" ref="wrapper">
   <div class="content">
    <slot></slot>
   </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    props:{
      probeType:{
       type:Number,
       default:0
      },
      pullUpLoad:{
        type:Boolean,
        default:true
      }
    },
    data(){
     return {
       scroll:null
     }
    },
    mounted() { //一旦被挂载后调用
      this.scroll=new BScroll(this.$refs.wrapper,{
        click:true,
        probeType:this.probeType,//不把probeType写死，在有些地方不需要实时侦测，会影响性能，根据props里面传入
        pullUpLoad:this.pullUpLoad,
        observeDOM:true//不用手机端和电脑端来回切换才能滚动
      })
      this.scroll.on('scroll',(position) =>{//监听滚动的位置
        //console.log(position);
        this.$emit('scroll',position)//把position传出去,scroll是发出去的事件名称
      })
      this.scroll.on('pullingUp',() =>{
        this.$emit('pullingUp')
      })
    },
    methods:{
     scrollTo(x,y,time=300) {
       this.scroll && this.scroll.scrollTo(x,y,time) //scroll是不是为空
     },
      finishPullUp(){
       this.scroll.finishPullUp()//调用完成下拉加载更多方法
      },
      refresh(){
        this.scroll && this.scroll.refresh()
      },
      getScrollY(){
       return this.scroll ? this.scroll.y :0
      }
    }
  }
</script>

<style scoped>

</style>
