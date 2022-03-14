<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <el-button type="primary">点我</el-button>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      await setTimeout(() => {
        console.log("执行");
      });
    },
  },
};
</script>

<style>

</style>
