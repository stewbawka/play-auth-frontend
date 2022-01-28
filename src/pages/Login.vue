<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from '@/store';

export default defineComponent({
  name: "Login",
  setup() {
    const { session, setSessionToken } = useStore();
    return { session, setSessionToken };
  },
  data() {
    return {
      email: "",
      password: "",
    }
  },
  methods: {
    async requestLogin(e : any) {
      e.preventDefault();
      const json = JSON.stringify({ email: this.email, password: this.password });
      const config = {
        withCredentials: true
      }
      if (this.setSessionToken) {
        const res = await this.axios.post("/tokens", json, config);
        this.setSessionToken(res.data.data.token);
      }
    },
    async requestUsers(e : any) {
      e.preventDefault();
      const config = {
        headers: {
          'Authorization': `Bearer ${this.session?.token}`,
        },
      }
      const res = await this.axios.get("/users", config);
      console.log(res);
    },
  },
});
</script>

<template>
<div class="flex justify-center bg-gray-300 pt-8">
  <form class="grid grid-cols-1 gap-6" @submit="requestLogin" novalidate>
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
        Login {{ session?.token }}
      </button>
    </div>
  </form>
  <button class="my-4 px-4 py-2 border-2 border-black rounded-lg text-white bg-blue-900" v-on:click="requestUsers">
    Fetch User
  </button>
</div>
</template>
