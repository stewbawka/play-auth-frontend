<template>
  <Login />
</template>

<script lang="ts">
import Login from './pages/Login.vue';
import { createStore } from './store';

export default {
  name: 'App',
  setup() {
    createStore();
  },
  components: {
    Login
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
