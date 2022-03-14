<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <img src="../assets/1.jpg" alt="">
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hello{
  width: 500px;
  height: 500px;
  color: red;
  // background: url('../assets/1.jpg') no-repeat;
  h1{
    transform: rotate(50deg);
  }
}
.hhhh {
  color:yellow;
}
</style>
