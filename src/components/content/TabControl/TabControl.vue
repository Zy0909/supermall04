<template>
    <div class="tab-control">
      <div v-for="(item,index) in titles" class="tab-control-item"
           :class="{active: index==currentIndex}" @click="itemClick(index)"><!--动态绑定属性 -->
      <span>{{item}}</span>
    </div>
    </div>
</template>

<script>
  export default {
    name: "TabControl",
    data() {
      return {
        currentIndex:0
      }
    },
    methods :{
       itemClick(index){
         this.currentIndex=index;//tabClick是发送的事件名称
         this.$emit('tabClick',index);// 内部向外面传数据用emit,外面向里面传数据用props 监听点击事件，index代表点击了谁
       }

    },
    props:{//不确定div里面显示什么内容，不同地方显示不同内容，就引入props
      titles:{   //使用的时候传入文字就行，根据传入的文字决定div里显示什么
        type:Array,
        default(){ //返回的是对象或数组的话，default为函数
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .tab-control {
    display:flex;
    text-align: center;
    background-color: #fff;
  }
.tab-control-item {
    flex:1;
  height:40px;
  line-height: 40px;
}
  .tab-control-item span {
    padding: 5px;
  }
  .active {
    color: var(--color-high-text);
  }
  .active span {
    border-bottom: 3px solid var(--color-tint);
  }
</style>
