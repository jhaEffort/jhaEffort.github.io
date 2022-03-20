<template>
  <div class="shell">
    <div class="content">内容</div>
    <a href="weixin://">打开微信</a>
    <a href="alipays://">打开支付宝</a>
    <el-button @click="handler">点击</el-button>
    <img src="../../assets/images/1.jpg" style="width: 200px" alt="" />
  </div>
</template>

<script>
export default {
  name: "list",
  methods:{
    handler() {
      this.$router.push({
        name:'my'
      })
    }
  }
};
</script>
<style scoped lang="scss">
.shell{
  height: 1000px;
}
.content {
  transform: rotate(4deg);
  color: red;
  width: 100px;
}
</style>