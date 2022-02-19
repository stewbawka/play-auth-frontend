<script lang="ts">
import { defineComponent, inject, onMounted, ref } from "vue";
import { useStore } from '@/store';
import { User } from '@/types';

export default defineComponent({
  name: "Settings",
  setup() {
    const { session, setSession } = useStore();

    const loading = ref(true);
    const u: User = {};
    const data = ref(u);
    const axios: any = inject('axios')

    onMounted(async () => {
      if (setSession) {
        const config = {
          withCredentials: true
        }
        const res = await axios.get("/tokens/me", config);
        const user: User = {
          id: res.data.data.user.id,
          email: res.data.data.user.email,
          firstName: res.data.data.user.first_name,
          lastName: res.data.data.user.last_name,
        };
        setSession(res.data.data.token, user);
        data.value = Object.assign({}, user);
        loading.value = false;
      }
    });

    async function onSubmit(e : any) {
      e.preventDefault();

      if (session && session.value.user) {
        const userId = session.value.user.id;
        console.log(userId);
        const config = {
          headers: {
            'Authorization': `Bearer ${session.value.token}`,
          },
        }
        const payload = {
          first_name: data.value.firstName,
          last_name: data.value.lastName,
        };
        const res = await axios.patch(`/users/${userId}`, payload, config);

        console.log(res);
        console.log(data.value);
      }
    }
     
    return { session, data, setSession, onSubmit };
  },
});
</script>

<template>
<div class="flex justify-center bg-gray-300 pt-8">
  <form class="grid grid-cols-1 gap-6" @submit="onSubmit" novalidate>
    <label class="block">
      <span class="text-gray-700">Email</span>
      <input type="text" class="control" readonly v-model="data.email" />
    </label>
    <label class="block">
      <span class="text-gray-700">First Name</span>
      <input type="text" class="control" v-model="data.firstName" />
    </label>
    <label class="block">
      <span class="text-gray-700">Last Name</span>
      <input type="text" class="control" v-model="data.lastName" />
    </label>
    <div>
      <button class="my-4 px-4 py-2 border-2 border-black rounded-lg text-white bg-blue-900">
        Update
      </button>
    </div>
  </form>
</div>
</template>
