import {defineComponent, onBeforeMount, reactive, ref} from "vue";
import TxButton from "../../components/tx-button.vue";
import sendRequest from "../../infra/sendRequest";
import {useRouter} from "vue-router";

export enum errorsFindTaxi {
  DRIVERS_NOT_FOUND = "Drivers were not found",
  FIND_TAXI_CANCELLED = "Find taxi cancelled",
}

export default defineComponent({
  name: "passenger-main-page",
  components: {
    TxButton,
  },
  setup: () => {
    const name = ref("");
    const isLoadingUserInfo = ref(false);
    const isLoading = ref(false);
    const router = useRouter();

    const driveInfo = reactive<any>({
      status: false
    });

    let userInfo = reactive<{
      name?: string,
      car?: string | null,
      drives?: string[] | [],
      phone?: string,
    }>({});
    const address = reactive({
      from: "",
      to: "",
    })

    onBeforeMount(() => {
      isLoadingUserInfo.value = true;

      sendRequest("auth/user-info").then(res => {
        if(!res) {
          return;
        }
        userInfo.name = res.data.name;
        userInfo.car = res.data.car;
        userInfo.drives = res.data.drives;
        userInfo.phone= res.data.phone

        isLoadingUserInfo.value = false;
      }).catch(e => {
        console.log(e);
        // localStorage.removeItem("tx1_token");
        // router.push({path: "/"})
      })
    })

    function cancelFindTaxi() {
      sendRequest("passenger/cancel-find-taxi").then(res => {
        if(!res) {
          console.log(res);
        }

        console.log("drive was cancelled");
      })
    }

    function findTaxi() {
      const from = address.from.trim();
      const to = address.to.trim();

      localStorage.home_address = from;

      const payload = {
        from: from,
        to: to,
      }

      isLoading.value = true;

      sendRequest("passenger/find-taxi", payload, "POST", )
        .then((res: any) => {

          if(res.message === errorsFindTaxi.FIND_TAXI_CANCELLED) {
            isLoading.value = false;
          }
          const data = res.data;
          console.log(data.drive.from_address);
          driveInfo.drive = {
            from: data.drive.from_address,
            to: data.drive.to_address
          };

          driveInfo.driver = {
            name: data.driver.name,
            car: data.driver.car,
            phone: data.driver.phone
          }

          driveInfo.status = true;

          isLoading.value = false;
        })
        .catch(e => {
          console.log(e);
        })
    }

    return {
      userInfo,
      isLoadingUserInfo,
      address,
      findTaxi,
      driveInfo,
      isLoading,
      cancelFindTaxi
    }
  }
});
