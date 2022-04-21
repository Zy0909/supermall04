<template>
  <div class="toast" v-show="show">
   <div >{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    props:{
      message:{ //改变message属性，会改变弹窗内文字；改变show,会决定要不要显示。
        type:String,
        default:''
      },
      show:{
        type:Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>
.toast {
  position:fixed;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  padding: 8px 10px;
  color: #f6f6f6;
  background-color: rgba(0,0,0,.5);
}
</style>
