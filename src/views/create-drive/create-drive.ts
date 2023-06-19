import {defineComponent, onBeforeMount, ref, reactive} from "vue";
import sendRequest from "../../infra/sendRequest";
import {useRouter} from "vue-router";
import TxToast from "../../components/tx-toast/tx-toast.vue";
import TxMainInput from "../../components/tx-main-input.vue"
import TxButton from "../../components/tx-button.vue"

export default defineComponent({
  name: "create-drive",
  components: {
    TxToast,
    TxMainInput,
    TxButton
  },
  setup: () => {
    const formData = reactive({
      name: "",
      phone: "",
      car: "",
      description: "",
      seats: "",
      date_start: "",
      time_start: "",
      price: "",
      from: "",
      to: ""
    });

    const router = useRouter();

    const toast = reactive({
      text: "",
      active: false
    })


    onBeforeMount(() => {
      sendRequest("user/profile").then((res: any) => {
        if(res) {
          formData.name = res.data.user.name;
          formData.phone = res.data.user.phone;
          let date = new Date();
          console.log(date);
          let year = date.getFullYear();
          let month = (date.getMonth() + 1).toString().padStart(2, '0');
          let day = date.getDate().toString().padStart(2, '0');

          let formattedDate = `${year}-${month}-${day}`;
          console.log(formattedDate); // Вывод: "2023-05-25"

          formData.date_start = formattedDate;

          return;
        }
      })
    })

    const interval = ref();

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

    function sumbitForm() {
      if(!formData.name) {
        openToast(true, "Введите имя")
        return;
      }

      if(!formData.phone) {
        openToast(true, "Введите телефон")
        return;
      }

      if(!formData.date_start || !formData.time_start) {
        openToast(true, "Введите дату и время поездки")
        return;
      }

      if(!formData.seats) {
        openToast(true, "Укажите количество мест")
        return;
      }

      if(!formData.from || !formData.to) {
        openToast(true, "Укажите откуди и куда вы едите")
        return;
      }

      if(!formData.price) {
        openToast(true, "Введите цену");
        return;
      }

      if(!formData.description) {
        formData.description = `Из ${formData.from} в ${formData.to}. ${formData.date_start} ${formData.time_start}`
      }

      const dateString = formData.date_start;
      const timeString = formData.time_start;
      const dateTimeString = `${dateString}T${timeString}:00`
      console.log(dateTimeString);
      const dateObj = new Date(dateTimeString);
      console.log(dateObj);

      if(!dateObj) {
        toast.text = "Ошибка даты"
        toast.active = true;
        return;
      }

      const timestamp = dateObj.getTime();

      const payload = {
        name: formData.name,
        phone: formData.phone,
        seats: +formData.seats,
        from: formData.from,
        to: formData.to,
        status: 0,
        booked_seats: 0,
        date_start: timestamp,
        price: formData.price,
        description: formData.description,
        car: formData.car
      }

      console.log(payload);
      sendRequest("drive", payload, "POST").then((res: any) => {
        if(res.data.message !== "error") {
          router.push({ name: "one-drive", params: {id: res.data._id}})
        }
      })
    }
    return {
      formData,
      sumbitForm,
      toast
    }
  }
});
