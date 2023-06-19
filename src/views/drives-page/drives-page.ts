import {defineComponent, onMounted, ref, reactive, onBeforeMount, onUnmounted} from "vue";
import TxInput from "../../components/tx-input/tx-input.vue";
import TxButton from "../../components/tx-button.vue";
import TxCardDrive from "../../components/tx-card-drive/tx-card-drive.vue";
import sendRequest from "../../infra/sendRequest";
import jwtDecode from "jwt-decode";
import Popup from "../../components/popup/popup.vue";
import TxMainInput from "../../components/tx-main-input.vue";

export default defineComponent({
  name: "drives-page",
  components: {
    TxInput,
    TxButton,
    TxCardDrive,
    Popup,
    TxMainInput
  },
  setup: () => {
    const search = ref("");
    const page = ref(1);
    let drives = ref<any>([])
    const isLoading = ref(false);
    const scrollComponent = ref(null)
    let drive = ref<any>(null);
    const isOpenDrive = ref(false);
    const drivesNotFound = ref(false);
    const formData = reactive({
      name: "",
      phone: "",
      count_seats: 1,
      description: "",
      id: "",
      from: "",
      to: ""
    })

    function getDrives(isNew: boolean = false) {
      drivesNotFound.value = false;

      let url = `drives?page=${page.value}`;

      if(formData.from && formData.to) {
        url += `&from=${formData.from}&to=${formData.to}`
      }

      if(isNew) {
        drives.value = [];
      }

      sendRequest(url).then((res: any) => {
        if(res && res.data.drives && res.data.drives.length) {
          if(!res.data.drives.length) {
            drivesNotFound.value = true;
            return;
          }

          const drivesPaginate = res.data.drives.map((item: any) => {
            let dateCreated = new Date(item.drive.created_at);
            let months = (dateCreated.getMonth() + 1).toString().padStart(2, "0")
            let day = dateCreated.getDate().toString().padStart(2, "0");
            let hours = dateCreated.getHours().toString().padStart(2, "0");
            let minutes = dateCreated.getMinutes().toString().padStart(2, "0")


            const formattedDate = `${day}.${months} ${hours}:${minutes}`
            return {
              id: item.drive._id,
              description: item.drive.description,
              name: item.drive.name,
              from: item.drive.from,
              to: item.drive.to,
              created_at: formattedDate,
              seats: item.drive.seats,
              booked_seats: item.drive.booked_seats,
            }
          });

          drives.value = [...drives.value, ...drivesPaginate]
        } else {
          window.removeEventListener("scroll", handleScroll)
        }

      })
        .finally(() => {
          isLoading.value = false;
        })
    }

    onBeforeMount(() => {
      const decodedToken: any = jwtDecode(localStorage.tx1_token);
      localStorage.tx1_user_id = decodedToken.id

      isLoading.value = true;
      getDrives();
    })

    onMounted(() => {
      window.addEventListener("scroll", handleScroll)
    })

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll)
    })

    const handleScroll = () => {
      let element: any = scrollComponent.value
      if (element.getBoundingClientRect().bottom - 50 < window.innerHeight) {
        page.value += 1;
        getDrives();
      }
    }

    function loadMoreDrives() {
      console.log("Loading more")
    }

    function closeOpenDrive() {
      document.body.style.overflow = "auto";
      isOpenDrive.value = false;
    }

    function openDrive(id: string) {
      document.body.style.overflow = "hidden";
      console.log("open");
      isOpenDrive.value = true;
      sendRequest("drive/" + id).then((res: any) => {
        if(res.data.message !== "error") {
          drive.value = res.data.drive;

          let date = new Date(drive.value.date_start);
          let year = date.getFullYear();
          let month = (date.getMonth() + 1).toString().padStart(2, '0');
          let day = date.getDate().toString().padStart(2, '0');
          let hours = date.getHours().toString().padStart(2, "0");
          let minutes = date.getMinutes().toString().padStart(2, "0");

          drive.value.date_start = `${year}-${month}-${day}`;
          drive.value.time_start = `${hours}:${minutes}`;

          let dateCreate = new Date(drive.value.created_at);
          year = dateCreate.getFullYear();
          month = (dateCreate.getMonth() + 1).toString().padStart(2, '0');
          day = dateCreate.getDate().toString().padStart(2, '0');
          hours = dateCreate.getHours().toString().padStart(2, "0");
          minutes = dateCreate.getMinutes().toString().padStart(2, "0");


          drive.value.created_at = `${year}-${month}-${day} ${hours}:${minutes}`;
          drive.value.isOwning = res.data.isOwning;
          if(!drive.value.isOwning) {
            drive.value.isBook = res.data.isBook;
          } else {
            drive.value.isBook = false;
          }

          if(res.data.aboutUser) {
            formData.name = res.data.aboutUser.name;
            formData.phone = res.data.aboutUser.phone;
            formData.description = res.data.aboutUser.description;
            formData.count_seats = res.data.aboutUser.booked_seats;
            formData.id = res.data.aboutUser._id;
          }
        }
      }).catch((err) => {
        console.log(err);
      })
        .finally(() => {
          isLoading.value = false;
        })
    }
    return {
      search,
      drives,
      loadMoreDrives,
      scrollComponent,
      isOpenDrive,
      closeOpenDrive,
      openDrive,
      drive,
      formData,
      getDrives,
      drivesNotFound
    }
  }
});
