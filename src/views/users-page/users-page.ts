import {defineComponent, onBeforeMount, ref} from "vue";
import sendRequest from "../../infra/sendRequest"

export default defineComponent({
  name: "users-page",
  setup: () => {
    const users = ref();
    onBeforeMount(() => {
      sendRequest("users").then((res: any) => {
        if(res.data) {
          users.value = res.data;
        }
      })
    })

    return {
      users
    }
  }
});
