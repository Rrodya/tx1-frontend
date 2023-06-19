import {defineComponent, onBeforeMount, reactive, ref} from "vue";
import sendRequest from "../../infra/sendRequest";
import TxButton from "../../components/tx-button.vue";

export default defineComponent({
  name: "driver-main-page",
  components: {
    TxButton
  },
  setup: () => {

    const userInfo = reactive<{
      name?: string,
      phone?: string,
      car?: string,
    }>({});
    const isLoadingUserInfo = ref(false);
    const findOrderIsLoading = ref(false);
    const isFindOrder = ref(false);
    const newOrder = ref(false);
    const isAcceptOrder = ref(false);
    const currentOrderToAccept = reactive<Record<string, string>>({});
    const isLoading = ref(false);

    const infoOrder = reactive({
      status: false,
      drive: {
        id: "",
        from: "",
        to: "",
      },
      passenger: {
        name: "",
        phone: "",
      }
    })

    onBeforeMount(() => {
      isLoadingUserInfo.value = true;
      isFindOrder.value = localStorage.isFindOrder;
      sendRequest("auth/user-info").then(res => {
        if(res) {
          const data = res.data;
          userInfo.name = data.name;
          userInfo.phone = data.phone;
          userInfo.car = data.car;

        }
        isLoadingUserInfo.value = false;
      })
    })

    function findOrder() {
      findOrderIsLoading.value = true;
      localStorage.isFindOrder = true;
      isFindOrder.value = true;

      sendRequest("driver/find-order", {}, "POST").then(res => {
        if(res) {
          newOrder.value = true;
          console.log(newOrder.value);
          console.log(res.data);
          currentOrderToAccept.from = res.data.from;
          currentOrderToAccept.to = res.data.to;
          currentOrderToAccept.id = res.data.id;
        }
        findOrderIsLoading.value = false;
      })
    }

    function stopFindOrder() {
      isFindOrder.value = false;
      localStorage.isFindOrder = false;
    }

    function acceptOrder(status: number) {
      isLoading.value = true;
      console.log(currentOrderToAccept);
      sendRequest(
        "driver/accept-order",
        {
          status: status,
          driveId: currentOrderToAccept.id
        },
        "POST").then(res => {
          if(res) {
            if(res.data.message === "drive was canceled") {
              infoOrder.status = false;
              return;
            }
            isLoading.value = false;
            newOrder.value = false;
            const data = res.data;
            infoOrder.status = true;
            infoOrder.drive.id = data.drive.id;
            infoOrder.drive.from = data.drive.from;
            infoOrder.drive.to = data.drive.to;
            infoOrder.passenger.name = data.passenger.name;
            infoOrder.passenger.phone = data.passenger.phone;
          }
      })
    }

    return {
      userInfo,
      newOrder,
      findOrder,
      acceptOrder,
      isFindOrder,
      stopFindOrder,
      currentOrderToAccept,
      infoOrder
    }
  }
});
