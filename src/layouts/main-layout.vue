<template>
  <header class="full-container mx-auto px-5 py-5 md:px-0 flex justify-between items-center">
    <div>
        <router-link to="/" class="route">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_1_15)">
                    <rect x="9" y="18" width="9" height="9" fill="#A594F9"/>
                    <rect x="9" width="9" height="9" fill="#A594F9"/>
                    <rect x="18" y="27" width="9" height="9" fill="#A594F9"/>
                    <rect y="27" width="9" height="9" fill="#A594F9"/>
                    <rect x="18" y="9" width="9" height="9" fill="#A594F9"/>
                    <rect x="27" y="9" width="9" height="9" fill="#A594F9"/>
                    <rect y="9" width="9" height="9" fill="#A594F9"/>
                </g>
                <defs>
                    <clipPath id="clip0_1_15">
                        <rect width="36" height="36" fill="white"/>
                    </clipPath>
                </defs>
            </svg>
        </router-link>
    </div>
    <div class="flex  items-center">
      <div class="space-x-8 text-xs text-purple-four">
        <div v-if="store.state.isAuth" class="space-x-8">
          <router-link to="/drives" class="hover:underline transition delay-500">Поездки</router-link>
          <router-link v-if="!store.state.isAdmin" to="/create-drive" class="hover:underline">Добавить</router-link>
          <router-link v-if="store.state.isAdmin" to="/users" class="hover:underline">Пользователи</router-link>
          <router-link v-if="!store.state.isAdmin" :to="'/user/' + getUserId" class="hover:underline font-bold">{{getNameToken}}</router-link>
          <span @click="logout" class="hover:underline">Выход</span>
        </div>
        <div v-else class="space-x-8">
            <router-link to="/driver/registration" class="hover:underline">Регистрация</router-link>
            <router-link to="/driver/login" class="hover:underline">Авторизация</router-link>
        </div>
      </div>
    </div>
  </header>

  <main class="main full-container mx-auto py-14 sm:px:0">
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
import {computed, defineComponent, onBeforeMount, onUpdated, ref} from 'vue';
import parseToken from "../utils/parseToken";
import {UserRole} from "../enums";
import { useStore } from  "vuex";
import {useRouter} from "vue-router";
import sendRequest from "../infra/sendRequest";

export default defineComponent({
  name: "mainLayout",
  setup() {
    let urlPathname = ref(window.location.pathname);
    const active = ref("drives");
    const activeSidebar = ref(false);
    const decodedToken = ref<any | null>(null);
    const store = useStore();
    const homeLink = ref("/");
    console.log(store.state.isAuth);
    const router = useRouter();


    if(localStorage.tx1_token) {
      decodedToken.value = parseToken(localStorage.tx1_token);
      console.log(decodedToken.value)
      localStorage.tx1_profile_name = decodedToken.value.name
      localStorage.tx1_user_id = decodedToken.value.id
    }


    onUpdated(() => {
      urlPathname.value = window.location.pathname
    })

    const getNameToken = computed(() => {
      return localStorage.tx1_profile_name ? localStorage.tx1_profile_name : "Профиль"
    })

    const getUserId = computed(() =>{
      return localStorage.tx1_user_id
    })

    function logout() {
      localStorage.removeItem('tx1_token')
      localStorage.removeItem('tx1_user_id')
      location.reload();
      // router.push("/")
    }
    return {
      urlPathname,
      active,
      activeSidebar,
      decodedToken,
      store,
      homeLink,
      logout,
      getNameToken,
      getUserId
    }
  }
})
</script>

<style>
.route:active rect {
  fill: #d2cbf3;
  transition: all .05s linear;
}
</style>
