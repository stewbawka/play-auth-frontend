<script lang="ts">
import { defineComponent } from "vue";
import router from "@/router";
import { useStore } from '@/store';

export default defineComponent({
  name: "Logout",
  setup() {
    const { clearSession } = useStore();
    if (clearSession) {
      clearSession();
    }
    router.push("/login");
  },
});
</script>

