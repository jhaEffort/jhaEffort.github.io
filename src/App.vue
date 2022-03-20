<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",

  mounted() {},
  methods: {},
};
</script>

<style lang="scss">
::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background-color: transparent;
}
::-webkit-scrollbar-track {
    background-color: transparent;
}
::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-image: linear-gradient(135deg, #09f, #3c9);
}


#app {
  height: 100vh;
}
</style>

