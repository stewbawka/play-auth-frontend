<script lang="ts">
import { defineComponent, watch } from "vue";
import router from "@/router";
import { useApi } from "@/modules/api";
import { useAuth } from "@/modules/auth";

export default defineComponent({
  name: "Logout",
  setup() {
		const config = {
			withCredentials: true
		}
    const { loading, post } = useApi("/tokens/invalidate", config);
    post()

    watch([ loading ], () => {
      console.log('invalidated watch');
      const { clearUser } = useAuth();
      clearUser();
      router.push({ name: 'login' });
    });
  },
});
</script>

<template>
<div class="flex justify-center bg-gray-300 pt-8">
  Logging out
</div>
</template>
