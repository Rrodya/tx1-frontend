import Vuex from "vuex";

export const store = new Vuex.Store<any>({
  modules: {},
  actions: {
    checkAPI() {
      return {message: "OK"}
    }
  },
  state: {
    stateFieldExample: false,
    formDataReg: {
      phone: "",
      name: "",
      car: null,
      password: "",
      role: ""
    },
    isAuth: false,
    isAdmin: false,
  },
  mutations: {
    setFormDataReg(context, {phone, name, password, car}) {
      context.formDataReg.phone = phone.split(" ").join("");
      context.formDataReg.name = name;
      context.formDataReg.password = password;
      context.formDataReg.car = car;
      context.formDataReg.role = localStorage.role;
    }
  },
  getters: {
    getIsAdmin(context) {
      return context.state.isAdmin;
    }
  }
})
