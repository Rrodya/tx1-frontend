<template>
  <div class="main-view py-20">
    <h1 class="text-center">Добро пожаловать.</h1>
    <h3 class="text-center mt-6">Это приложение было создано, для того чтобы облегчить вам жизнь. Выбирете роль.</h3>
    <div class="w-90-percent flex flex-col mt-32 md:w-1/3 m-auto">
      <h2 class="text-center text"></h2>
      <TxButton class="sm-w-" text="Водитель" :classes="['btn-primary']" @handle="handleRoute('DRIVER')"/>
      <TxButton class="mt-3" text="Пассажир" :classes="['btn-primary']"  @handle="handleRoute('PASSNEGER')"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TxButton from "../components/tx-button.vue";
import { useRouter } from  "vue-router";
import { useStore } from "vuex";
import {store} from "../store";
export default defineComponent({
  name: "mainView",
  components: {
    TxButton
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    function handleRoute(role: string) {
      localStorage.role = role;
      store.state.role = role;
      router.push({ path: '/driver'})
    }
    return {
      handleRoute
    }
  }
})
</script>
