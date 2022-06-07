<script lang="ts">
import { defineComponent, reactive, watch, toRefs } from "vue";
import { useAuth } from "@/modules/auth";
import { useApi } from "@/modules/api";

interface SettingsUpdatePayload {
  email: string;
  firstName: string;
  lastName: string;
}

export default defineComponent({
  name: "Settings",
  setup() {
    const { user } = useAuth();
    const userId = user?.value?.id;
    const { loading, data, patch } = useApi(`/users/${userId}`);
    const payload = reactive<SettingsUpdatePayload>({
      email: user?.value?.email || "",
      firstName: user?.value?.firstName || "",
      lastName: user?.value?.lastName || "",
    });
    const submit = async () => {
      patch(payload);
    };

    watch([ data ], () => {
      console.log('settings watch');
      console.log(data);
    });
    return { loading, submit, ...toRefs(payload) };
  },
});
</script>

<template>
<div class="flex justify-center bg-gray-300 pt-8">
  <form class="grid grid-cols-1 gap-6" @submit.prevent="submit" novalidate>
    <label class="block">
      <span class="text-gray-700">Email</span>
      <input type="text" class="control" readonly v-model="email" />
    </label>
    <label class="block">
      <span class="text-gray-700">First Name</span>
      <input type="text" class="control" v-model="firstName" />
    </label>
    <label class="block">
      <span class="text-gray-700">Last Name</span>
      <input type="text" class="control" v-model="lastName" />
    </label>
    <div>
      <button class="my-4 px-4 py-2 border-2 border-black rounded-lg text-white bg-blue-900">
        Update
      </button>
    </div>
  </form>
</div>
</template>
