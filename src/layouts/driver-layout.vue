<template>

  <router-view></router-view>
</template>
<script lang="ts">
import {defineComponent, ref} from "vue";
import sideBar from "../components/side-bar/side-bar.vue";

export default defineComponent({
  name: "driverLayout",
  components: {
    sideBar
  },
  setup: () => {
    const isFindOrder = ref(localStorage.isFindOrder);
    return {
      isFindOrder
    }
  }
})
</script>
