import Vuex from "vuex";

export const store = new Vuex.Store<any>({
  modules: {},
  getters: {},
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
    }
  },
  mutations: {
    setFormDataReg(context, {phone, name, password, car}) {
      context.state.formDataReg.phone = phone;
      context.state.formDataReg.phone = name;
      context.state.formDataReg.phone = password;
      context.state.formDataReg.phone = car;
    }
  },
})
