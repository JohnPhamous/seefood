<template>
  <b-button v-on:click="print" class="btn drop-shadow" size="sm">
    <slot></slot>
  </b-button>
</template>

<script>
export default {
  methods: {
    print() {
      console.log('hello');
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/seefood.scss';

.btn {
  border-radius: 50px;
  padding: 10px 15px;
  border: none;
  margin-left: 20px;
}
</style>
