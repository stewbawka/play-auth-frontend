<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { useApi } from "@/modules/api";
import { useAuth } from "@/modules/auth";

interface LoginPayload {
  email: string;
  password: string;
}

export default defineComponent({
  name: "Login",
  setup() {
    console.log('loginsetup');
    const { loading, data, post } = useApi("/tokens");
    const payload = reactive<LoginPayload>({
      email: "login@host.com",
      password: "test12345",
    });

    const submit = async () => {
      await post(payload)
      const { setUser } = useAuth();
      console.log('aftersubmit');
      console.log(data.value)
      setUser(data.value);
    };
    return { loading, submit, ...toRefs(payload) };

  },
});
</script>

<template>
<div class="flex justify-center bg-gray-300 pt-8">
  <form class="grid grid-cols-1 gap-6" @submit.prevent="submit" novalidate>
    <label class="block">
      <span class="text-gray-700">Email</span>
      <input type="email" class="control" v-model="email" />
    </label>
    <label class="block">
      <span class="text-gray-700">Password</span>
      <input type="password" class="control" v-model="password" />
    </label>
    <div>
      <button class="my-4 px-4 py-2 border-2 border-black rounded-lg text-white bg-blue-900">
        Login
      </button>
    </div>
  </form>
</div>
</template>
