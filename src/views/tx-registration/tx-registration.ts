import {computed, defineComponent, onMounted, reactive, ref} from "vue";
import { mask } from "vue-the-mask"
import {UserRole} from "../../enums";
import TxButton from "../../components/tx-button.vue";
import TxInput from "../../components/tx-input/tx-input.vue";
import TxToast from "../../components/tx-toast/tx-toast.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import sendRequest from "../../infra/sendRequest";
import TxMainInput from "../../components/tx-main-input.vue";

export default defineComponent({
  name: "tx-registration",
  computed: {
    UserRole() {
      return UserRole
    }
  },
  setup: () => {
    const validRegistration = computed(() => {
      if(!formData.phone || !formData.name || !formData.password || formData.password.length < 7) {
        return false;
      }

      showToastReg.value = false;

      return true;
    })

    const formData = reactive({
      phone: "",
      name: "",
      password: "",
    })

    const isErrorReg = ref(validRegistration);

    const store = useStore()
    const router = useRouter();
    const role = ref(localStorage.role);
    const showToastReg = ref(false);

    function submitForm() {
      console.log(validRegistration.value);

      if(!validRegistration.value) {
        showToastReg.value = true;
        return;
      }

      showToastReg.value = false;

      formData.phone = formData.phone.split(" ").join("");

      sendRequest("auth/reg", formData, "POST").then(res => {
        console.log(res);
        router.push({path: "/driver/login"});
      })
        .catch(e => console.log(e));
    }

    return {
      formData,
      role,
      submitForm,
      isErrorReg,
      showToastReg
    }
  },
  components: {
    TxButton,
    TxInput,
    TxToast,
    TxMainInput
  }
});
