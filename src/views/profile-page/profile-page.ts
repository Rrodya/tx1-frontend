import {defineComponent, ref, onBeforeMount, reactive} from "vue";
import sendRequest from "../../infra/sendRequest";
import TxCardDrive from "../../components/tx-card-drive/tx-card-drive.vue";

export default defineComponent({
  name: "profile-page",
  components: {
    TxCardDrive
  },
  setup: () => {
    let user = ref(null);
    let my_drives = ref([]);
    onBeforeMount(() => {
      sendRequest("user/profile", {}).then((res: any) => {
        if(res.data) {
          user.value = res.data.user;
          my_drives.value = res.data.my_drives.map((item: any) => {
            let dateCreated = new Date(item.created_at);
            let months = (dateCreated.getMonth() + 1).toString().padStart(2, "0")
            let day = dateCreated.getDate().toString().padStart(2, "0");
            let hours = dateCreated.getHours().toString().padStart(2, "0");
            let minutes = dateCreated.getMinutes().toString().padStart(2, "0")

            const formattedDate = `${day}.${months} ${hours}:${minutes}`
            return {
              id: item._id,
              description: item.description,
              name: item.name,
              from: item.from,
              to: item.to,
              created_at: formattedDate,
              seats: item.seats,
              booked_seats: item.booked_seats
            }
          });
        }
      })
    })

    return {
      user,
      my_drives
    }
  }
});
