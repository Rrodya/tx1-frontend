import {defineComponent, onBeforeMount, ref} from "vue";
import {useRoute} from "vue-router";
import sendRequest from "../../infra/sendRequest";
import TxCardDrive from "../../components/tx-card-drive/tx-card-drive.vue";
import TxButton from "../../components/tx-button.vue";
import {URL} from "../../infra/sendRequest"
import {useStore} from "vuex";
export default defineComponent({
  name: "one-user-page",
  components: {
    TxCardDrive,
    TxButton
  },
  setup: () => {
    const route = useRoute();
    const id = route.params.id;
    const user = ref<any>(null);
    const ownDrives = ref(null);
    const bookedDrives = ref(null);
    const store = useStore()
    const tabs = ref([
      {
        id: 0,
        name: "Личные",
        isActive: true
      },
      {
        id: 1,
        name: "Пассажирские",
        isActive: false
      },
    ])

    onBeforeMount(() => {
      sendRequest("user/" + id).then((res: any) => {
        if(res.data) {
          user.value = res.data.user;
          ownDrives.value = res.data.ownDrives;
          bookedDrives.value = res.data.bookedDrives;
        }
      })
    })

    function makeExcel() {

      const downloadLink = document.createElement('a');
      downloadLink.href = URL + "user/download/" + id;
      downloadLink.target = "_blank";
      if(user.value && user.value.name) {
        downloadLink.download = user.value.name + ".xlsx" // Name of the file to be saved
      } else {
        downloadLink.download = "отчет.xlsx" // Name of the file to be saved
      }

      document.body.appendChild(downloadLink);
      downloadLink.click();
      downloadLink.remove();

    }

    const activeTab = (tabId: number) => {
      tabs.value = tabs.value.map(tab => {
        tab.isActive = false;
        return tab
      })
      tabs.value[tabId].isActive = true;
    }
    return {
      user,
      tabs,
      activeTab,
      ownDrives,
      bookedDrives,
      makeExcel,
      store
    }
  }
});
