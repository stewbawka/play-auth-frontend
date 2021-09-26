<script>
import { computed } from 'vue';
import { useStore } from "vuex";

export default {
  name: "Login",
  setup() {
    const store = useStore();
    let token = computed(function() {
      return store.state.token;
    });
    return {
      token
    }
  }
}
</script>

<template>
  <h1>Login Page {{ token }}</h1>
</template>
