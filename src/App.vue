<script setup></script>

<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<style lang="scss">
@import './scss/custom.scss';
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.0/font/bootstrap-icons.css');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css');
#app {
  color: #2c3e50;
  text-align: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
