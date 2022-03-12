<script lang="ts">
import { defineComponent, inject, onMounted } from "vue";
import router from "@/router";
import { useStore } from '@/store';

export default defineComponent({
  name: "Logout",
  setup() {
    const axios: any = inject('axios')
    const { clearSession } = useStore();

    onMounted(async () => {
      const config = {
        withCredentials: true
      }
      if (clearSession) {
        await axios.post("/tokens/invalidate", null, config);
        clearSession();
      }
      router.push("/login");
    });
  },
});
</script>
