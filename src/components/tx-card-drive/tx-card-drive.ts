import {defineComponent, onMounted, ref} from "vue";

export default defineComponent({
  name: "tx-card-drive",
  props: {
    drive: Object
  },
  setup: (props) => {
    const drive = props.drive;
    return {
      drive
    }
  }
});
