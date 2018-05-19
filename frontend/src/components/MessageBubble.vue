<template>
  <div class="speech-bubble drop-shadow">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import '../assets/styles/seefood.scss';

.speech-bubble {
  position: relative;
  background: $s-primary;
  border-radius: 0.4em;
  padding: 10px;
  width: 50%;
  margin-left: 30px;
  margin-bottom: 30px;
  color: white;
}
.speech-bubble:after {
  content: '';
  position: absolute;
  bottom: 0;
  width: 0;
  left: 5px;
  height: 0;
  border: 38px solid transparent;
  border-right-color: $s-primary;
  border-left: 0;
  border-bottom: 0;
  margin-top: -19px;
  margin-left: -38px;
}
</style>
