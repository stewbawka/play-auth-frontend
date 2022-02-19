<template>
  <router-view />
</template>

<script lang="ts">
import { createStore } from './store';

export default {
  name: 'App',
  setup() {
    createStore();
  },
}
</script>
