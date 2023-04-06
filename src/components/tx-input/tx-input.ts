import {defineComponent, ref} from "vue";

export default defineComponent({
  name: "tx-input",
  props: {
    type: String,
    text: String,
    placeholder: String,
  },
  setup: (props, { emit }) => {


    return {
      props
    }
  }
});
