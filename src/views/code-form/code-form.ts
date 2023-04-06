import {defineComponent, ref} from "vue";
import TxButton from "../../components/tx-button.vue";
import TxToast from "../../components/tx-toast/tx-toast.vue";
export default defineComponent({
  name: "code-form",
  setup: () => {
    const code = ref("");
    const rightCode = ref("1234")
    const isErrorCode = ref(false);
    function sendCode() {
      console.log(code.value);
      let localCode = code.value.split(" ").join("");
      console.log(localCode);
      if(localCode.length !== 4) {
        console.log("some error");
        return;
      }

      if(localCode !== rightCode.value) {
        isErrorCode.value = true;
        console.log('CODE IS INCORRECT')
        return;
      }

      isErrorCode.value = false

      console.log("CODE IS SENDED");


    }
    return {
      code,
      sendCode,
      isErrorCode
    }
  },
  components: {
    TxButton,
    TxToast
  }
});
