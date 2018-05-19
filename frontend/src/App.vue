<template>
  <div id="app">
    <div class="background"></div>
    <Home />
  </div>
</template>

<script>
import Home from './components/Home';

export default {
  name: 'App',
  components: {
    Home
  }
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto');

html,
body,
#app {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
html,
body {
  font-family: 'Roboto', sans-serif !important;
  // background: linear-gradient(to bottom, white, #ccc);
}
.background {
  background-image: url('./assets/food.png');
  background-position: center left;
  background-attachment: fixed;
  height: 150vh;
  width: 150vw;
  position: absolute;
  z-index: -1;
}
@import './assets/styles/seefood.scss';
</style>
