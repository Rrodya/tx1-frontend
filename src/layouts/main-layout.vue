<template>
  <!-- <header class="container mx-auto px-5 md:px-0">
    <div class="flex justify-between pt-5 items-center">
      <span class="font-bold text-2xl">TailWind</span>

      <div class="space-x-5">
        <a href="" class="hover:underline">About</a>
        <a href="" class="text-white bg-cool-red py-2 px-4 rounded-full hover:bg-red transition-colors ease-linear">Contacts</a>
      </div>
    </div>
  </header> -->
  <main class="main container mx-auto py-14 px-5 sm:px:0">
    <p class="absolute right-3 top-3 text-md font-bold text-white text-sky-300">Tx1</p>
    <transition name="fade" mode="out-in">
      <p
        v-if="urlPathname !== '/'"
        class="absolute left-3 top-3 text-md font-normal text-white text-sky-300"
        @click="$router.go(-1)"
      >Назад</p>
    </transition>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component"/>
      </transition>
    </router-view>
  </main>
  <!-- <footer class="w-full mx-auto py-5 fixed bottom-0 bg-white/50 backdrop-blur-md px-5 sm:px-0 dark:bg-black/50">
    <div class="container mx-auto flex justify-between items-center z-10 text-black dark:text-white">
      <div class="space-x-5">
        <a href="" class="hover:underline">About</a>
        <a href="" class="hover:underline">Contacts</a>
      </div>
      <div class="space-x-5">
        <a href="" class="hover:underline">Facebook</a>
        <a href="" class="hover:underline">Twitter</a>
        <a href="" class="hover:underline">Instagram</a>
      </div>
    </div>
  </footer> -->
</template>

<script lang="ts">
import {defineComponent, onUpdated, ref} from 'vue';

export default defineComponent({
  name: "mainLayout",
  setup() {
    let urlPathname = ref(window.location.pathname);

    onUpdated(() => {
      urlPathname.value = window.location.pathname
    })
    return {
      urlPathname
    }
  }
})
</script>
