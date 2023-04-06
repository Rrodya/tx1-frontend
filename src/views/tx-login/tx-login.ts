import {computed, defineComponent, reactive, ref} from "vue";
import TxButton from "../../components/tx-button.vue";
import TxToast from "../../components/tx-toast/tx-toast.vue";
import {sendLogin} from "../../stub";


export default defineComponent({
  name: "tx-login",
  setup: () => {
    const validLogin = computed(() => {
      if (formData.phone && formData.password) {
        return true
      }

      return false;
    })

    const showToastLoginValid = ref(false);
    const showToastLoginAuth = ref(false);
    const isErrorLogin = ref(validLogin);

    const formData = reactive({
      phone: "",
      password: ""
    });

    function submitForm() {
      if(!validLogin.value) {
        showToastLoginValid.value = true;
        return;
      }

      showToastLoginValid.value = false;

      sendLogin().then((data) => {
        if(data) {
          console.log(data);
          showToastLoginAuth.value = false;
        } else {
          showToastLoginAuth.value = true;
        }
      })
    }

    return {
      showToastLoginValid,
      showToastLoginAuth,
      isErrorLogin,
      submitForm,
      formData,
    }
  },
  components: {
    TxButton,
    TxToast
  }
});
