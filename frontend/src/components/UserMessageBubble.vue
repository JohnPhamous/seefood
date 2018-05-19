<template>
  <div class="speech-bubble-user drop-shadow">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import '../assets/styles/seefood.scss';

.speech-bubble-user {
  position: relative;
  background: $s-red;
  border-radius: 0.4em;
  padding: 10px;
  width: 80%;
  margin-left: auto;
  margin-right: 10px;
  margin-bottom: 30px;
  color: white;
}
.speech-bubble-user:after {
  content: '';
  position: absolute;
  right: 4px;
  bottom: 0;
  width: 0;
  height: 0;
  border: 15px solid transparent;
  border-left-color: $s-red;
  border-right: 0;
  border-bottom: 0;
  margin-top: -19px;
  margin-right: -15px;
}
</style>
