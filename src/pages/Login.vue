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
<div class="flex justify-center bg-gray-300 pt-8">
  <form class="grid grid-cols-1 gap-6">
    <label class="block">
      <span class="text-gray-700">Email</span>
      <input type="email" class="control" />
    </label>
    <label class="block">
      <span class="text-gray-700">Password</span>
      <input type="password" class="control" />
    </label>
    <div>
      <button class="my-4 px-4 py-2 border-2 border-black rounded-lg text-white bg-blue-900">
        Login
      </button>
    </div>
  </form>
</div>
</template>
