<template>
  <div id="app">
    <div class="background"></div>
    <b-container>
      <Home />
    </b-container>
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
html,
body,
#app {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
html,
body {
  // background: linear-gradient(to bottom, white, #ccc);
}
.background {
  background-image: url('./assets/background.jpg');
  background-repeat: no-repeat, repeat;
  background-position: center top;
  background-attachment: fixed;
  filter: blur(5px);
  height: 150vh;
  width: 150vw;
  position: absolute;
  z-index: -1;
}
@import './assets/styles/seefood.scss';
</style>
