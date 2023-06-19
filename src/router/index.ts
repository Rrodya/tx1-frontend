import { createRouter, createWebHistory } from "vue-router";
import mainLayout from "../layouts/main-layout.vue"
import mainView from "../views/main-view.vue"
import mainRegistration from "../views/main-registration.vue"
import {store} from "../store";
import sendRequest from "../infra/sendRequest";
import {UserRole} from "../enums";
import parseToken from "../utils/parseToken";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: mainLayout,
      beforeEnter(to: any, from, next) {
        const path = to.path.split("/");

        if (localStorage.tx1_token) {
          const decoded: any = parseToken(localStorage.tx1_token);
          store.state.isAdmin = decoded.roles[0] === "ADMIN";
        }

        if(path[1] === "" || path[1] === "driver") {
          console.log("first");
          sendRequest("auth/check-role").then(res => {
            const roles = res.data.message;


            if(roles.includes(UserRole.USER) || roles.includes(UserRole.ADMIN)) {
              store.state.isAuth = true;
              next("/drives");
            }

            next();
          }).catch(e => next())
        }

        if(path[1] !== "driver") {
          console.log("second");
          sendRequest("auth/check-role").then(res => {
            const roles = res.data.message;
            if(roles.length === 0) {
              store.state.isAuth = false;
              next("/");
            }

            if(roles.includes(UserRole.USER) || roles.includes(UserRole.ADMIN)) {
              console.log("next");
              console.log(to);
              console.log(from);
              store.state.isAuth = true;
              next();
            }
          }).catch(e => {
            store.state.isAuth = false;
            next("/")
          })
        }
      },
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
          path: "/drives",
          name: "drives",
          component: () => import("../views/drives-page/drives-page.vue")
        },
        {
          path: "/create-drive",
          name: "create-drive",
          component: () => import("../views/create-drive/create-drive.vue"),
        },
        {
          path: "/profile",
          name: "profile",
          component: () => import("../views/profile-page/profile-page.vue"),
        },
        {
          path: "/drive/:id",
          name: "one-drive",
          component: () => import("../views/one-drive-page/one-drive-page.vue")
        },
        {
          path: "/passenger-profile",
          component: () => import("../layouts/passenger-layout.vue"),
          children: [
            {
              path: "",
              name: "passenger-find-taxi",
              component: () => import("../views/passenger-main-page/passenger-main-page.vue"),
            }
          ]
        },
        {
          path: "/users",
          name: "users",
          component: () => import("../views/users-page/users-page.vue"),
          beforeEnter(to: any, from, next) {
            sendRequest("users").then((res: any)=> {
                  next();
            }).catch(err => {
              console.log("err");
              console.log(err);
              if(err.response.status === 403) {
                next("/");
              }
            })
          }
        },
        {
          path: "user/:id",
          name: "one-user",
          component: () => import("../views/one-user-page/one-user-page.vue")
        }
      ]
    }
  ]
})

export default router;
