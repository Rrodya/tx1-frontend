import { createRouter, createWebHistory } from "vue-router";
import mainLayout from "../layouts/main-layout.vue"
import mainView from "../views/main-view.vue"
import mainRegistration from "../views/main-registration.vue"
import {store} from "../store";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: mainLayout,
      // async beforeEnter(to, from, next) {
      //   if(
      //     to.name !== "login" &&
      //     to.name !== "registration"
      //   ) {

      //     console.log(store);
      //     // const response = await store.checkAPI();
      //     // console.log(response);

      //     // if(response) {
      //     //   next();
      //     // }
      //   }
      // },
      children: [
        {
          path: "",
          component: mainView
        },
        {
          path: "/driver",
          component: () => import("../views/driver-main/driver-main.vue")
        },
        {
          path: "/driver/registration",
          name: "driver-register",
          component: () => import("../views/tx-registration/tx-registration.vue")
        },
        {
          path: "/driver/login",
          name: "driver-login",
          component: () => import("../views/tx-login/tx-login.vue")
        },
        {
          path: "/driver/code",
          name: "driver-code",
          component: () => import("../views/code-form/code-form.vue")
        },
        {
          path: "/passenger/registration",
          name: "main-view",
          component: mainView
        },
        {
          path: "/passenger/login",
          name: "registration",
          component: mainRegistration
        },
      ]
    }
  ]
})

export default router;
