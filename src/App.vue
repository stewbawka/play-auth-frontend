<template>
  <p>user: {{ user?.email }}</p>
  <template v-if="isAuthenticating">
    <p>Authenticating...</p>
  </template>
  <template v-else>
    <router-view />
  </template>
</template>

<script lang="ts">
import { watch } from 'vue'
import { useAuth } from "@/modules/auth";

export default {
  name: 'App',
  setup() {
    const { isAuthenticating, user } = useAuth();

    watch([ user ], () => {
      console.log('app watch');
      console.log(user);
    });

    return { user, isAuthenticating };
  },
}
</script>
