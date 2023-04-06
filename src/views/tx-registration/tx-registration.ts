import {computed, defineComponent, onMounted, reactive, ref} from "vue";
import { mask } from "vue-the-mask"
import {UserRole} from "../../enums";
import TxButton from "../../components/tx-button.vue";
import TxInput from "../../components/tx-input/tx-input.vue";
import TxToast from "../../components/tx-toast/tx-toast.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "tx-registration",
  computed: {
    UserRole() {
      return UserRole
    }
  },
  directives: {
    mask
  },
  setup: () => {
    const validRegistration = computed(() => {
      if(!formData.phone || !formData.name || !formData.password || formData.password.length < 7) {
        return false;
      }

      if(localStorage.role === UserRole.DRIVER) {

        if(formData.carModel && formData.carNumber) {
          showToastReg.value = false;
          return true
        }
        return false;
      }
      showToastReg.value = false;

      return true;
    })

    const formData = reactive({
      phone: "",
      name: "",
      password: "",
      carModel: "",
      carNumber: "",
      car: "",
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

      if(localStorage.role === UserRole.DRIVER) {
        formData.car = formData.carModel + " " + formData.carNumber;
      }

      store.commit("setFormDataReg", formData);

      router.push({path: '/driver/code'})
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
    TxToast
  }
});
