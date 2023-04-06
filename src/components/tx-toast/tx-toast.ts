import {defineComponent, ref} from "vue";

export default defineComponent({
  name: "tx-toast",
  props: {
    text: String,
    status: String
  },
  setup: (props) => {
    return {
      props
    }
  }
});
