import {defineComponent, onBeforeMount, reactive, ref, computed} from "vue";
import { useRouter, useRoute} from "vue-router";
import sendRequest from "../../infra/sendRequest";
import {useLoading} from "vuesax-alpha";
import TxToast from "../../components/tx-toast/tx-toast.vue";
import TxButton from "../../components/tx-button.vue";
import TxMainInput from "../../components/tx-main-input.vue";
import {useStore} from "vuex";
import Popup from "../../components/popup/popup.vue";
export default defineComponent({
  name: "one-drive-page",
  methods: {useLoading},
  components: {
    Popup,
    TxToast,
    TxButton,
    TxMainInput
  },
  setup: () => {
    const route = useRoute();
    const store = useStore();

    const id = route.params.id;
    let drive = ref<any>(null);
    const books = ref();
    const isLoading = ref(true);
    const interval = ref();
    const toast = reactive({
      text: "",
      active: false
    })
    const formData = reactive({
      name: "",
      phone: "",
      count_seats: 0,
      description: "",
      id: "",
      price: "",
    })

    const formDataBook = reactive({
      name: "",
      phone: "",
      description: "",
      id: "",
      price: "",
      count_seats: 1,
    })

    const comments = ref<any>([]);
    const newComment = ref("");
    const isOpenComments = ref(false);

    const isAddBook = ref(false);

    function openComments() {
      isOpenComments.value = true;
      sendRequest("drive/comments/" + id).then((res: any) => {
        if(res.data) {
          res.data.forEach((comment: any) => {
            comments.value.push(comment);
          })
        }
      })
    }

    function sendComment() {
      console.log("send");
    }
    function closeOpenComments() {
      document.body.style.overflow = "auto";
      isOpenComments.value = false;
    }

    onBeforeMount(() => {
      sendRequest("drive/" + id).then((res: any) => {
        console.log(res.data);
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

          if(res.data.books.length) {
            books.value = res.data.books;
          } else {
            books.value = [];
          }

          if(res.data.aboutUser) {
            formData.name = res.data.aboutUser.name;
            formData.phone = res.data.aboutUser.phone;
            formData.description = res.data.aboutUser.description;
            formData.count_seats = res.data.aboutUser.seats
            formData.id = res.data.aboutUser._id;
          }
        }
      }).catch((err) => {
        console.log("err");
        console.log(err);
      })
        .finally(() => {
        isLoading.value = false;
        console.log(books.value);
      })
    })

    function toBookSeat() {
      if(drive.value.booked_seats >= drive.value.seats) {
        openToast(true, "Все места заняты")
        return;
      }
      isAddBook.value = true;
    }

    function openToast(status: boolean, text: string) {
      toast.text = text;
      toast.active = status;

      if(interval.value) {
        clearTimeout(interval.value);
      }

      interval.value = setTimeout(() => {
        toast.active = false;
      }, 3000)
    }
    function submitForm() {
      console.log("ha");

      console.log(+formData.count_seats)
      console.log(+drive.value.booked_seats)

      if((+formData.count_seats + +drive.value.booked_seats) > drive.value.seats) {
        openToast(true, "Вы выбрали мест больше чем имеется")
        return;
      }

      console.log(formData)

      if(+formData.count_seats < 1) {
        openToast(true, "Выбирите количество  мест")
        return;
      }

      const payload = {
        name: formData.name,
        phone: formData.phone.trim(),
        seats: +formData.count_seats,
        description: formData.description
      }

      console.log(payload);

      console.log(payload);

      sendRequest("/drive/to-book/" + drive.value._id, payload, "POST").then((res: any) => {

        if(res && res.data.message === "booked") {
          isAddBook.value = false;
          drive.value.isBook = true;
          drive.value.booked_seats += +formData.count_seats;
        }
      })
    }

    function cancelBook(passenger_id: string | undefined = undefined) {
      const payload: {
        passenger_id?: string
      } = {}
      if(passenger_id) {
        payload.passenger_id = passenger_id;
      }



      sendRequest("drive/cancel-to-book/" + drive.value._id, payload, "POST").then((res: any) => {
        if(res && res.data.message === "unbooked") {
          drive.value.isBook = false;
          drive.value.booked_seats -= +formData.count_seats;
          if(passenger_id) {
            books.value = books.value.filter((book: any) => {
              if(book.author_id == passenger_id) {
                drive.value.booked_seats -= book.seats;
              } else {
                return book
              }

            })
          }
        }
      })
    }

    function cancelDrive() {
      console.log(drive);
      // const payload = {
      //   passenger_id:
      // }
      sendRequest("/drive/cancel/" + drive.value._id, {}, "POST").then((res: any) => {
        if(res.data.message === "success") {
          drive.value.status = 1;
        }
      })
    }

    function deleteDrive() {
      console.log("deleteDrive");
      sendRequest("drive/" + drive.value._id, {}, "DELETE").then((res: any) => {
        if(res.data.message === "success") {
          location.reload();
        }
      })
    }

    function getFileDrive() {
      console.log("getFileDrive");
    }

    return {
      drive,
      isLoading,
      toBookSeat,
      cancelDrive,
      formData,
      toast,
      submitForm,
      cancelBook,
      isAddBook,
      store,
      deleteDrive,
      books,
      comments,
      newComment,
      isOpenComments,
      closeOpenComments,
      openComments,
      sendComment,
      formDataBook,
      getFileDrive,
    }
  }
});
