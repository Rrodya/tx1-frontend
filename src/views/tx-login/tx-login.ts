import {computed, defineComponent, reactive, ref} from "vue";
import TxButton from "../../components/tx-button.vue";
import TxToast from "../../components/tx-toast/tx-toast.vue";
import {sendLogin} from "../../stub";
import sendRequest from "../../infra/sendRequest";
import {Errors, UserRole} from "../../enums";
import { useRouter } from "vue-router";
import TxMainInput from "../../components/tx-main-input.vue";


export default defineComponent({
  name: "tx-login",
  setup: () => {
    const validLogin = computed(() => {
      if (formData.phone && formData.password) {
        return true
      }

      return false;
    })

    const router = useRouter();
    const showToastLoginValid = ref(false);
    const showToastLoginAuth = ref(false);
    const showToastLoginRole = ref(false);
    const isErrorLogin = ref(validLogin);

    const formData = reactive({
      phone: "",
      password: "",
      roles: [localStorage.role]
    });

    function submitForm() {
      if(!validLogin.value) {
        showToastLoginValid.value = true;
        return;
      }
      formData.phone = formData.phone.split(" ").join("");

      showToastLoginValid.value = false;
      sendRequest("auth/log", formData, "POST").then(res => {
        if(!res) {
          showToastLoginAuth.value = true;
        }

        if(res.data.error === Errors.AUTH_LOGIN) {
          showToastLoginAuth.value = true;
          return;
        }

        if(res.data.message === Errors.INCORRECT_AUTH_LOGIN) {
          showToastLoginRole.value = true;
          return;
        }

        localStorage.tx1_token = res.data.token;



        router.push({path: "/drives"})
        window.location.reload();
      }).catch(e => {
        showToastLoginAuth.value = true;
      })
    }

    return {
      showToastLoginValid,
      showToastLoginAuth,
      showToastLoginRole,
      isErrorLogin,
      submitForm,
      formData,
    }
  },
  components: {
    TxButton,
    TxToast,
    TxMainInput
  }
});
