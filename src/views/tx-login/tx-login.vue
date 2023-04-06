<template>
  <div class="tx-login">
    <h1 class="text-center mb-8 mt-6">Введите данные авторизации</h1>
    <label>
      <p class="text-white pb-2">Введите номер телефона</p>
      <input
        class="pr-2 bg-slate-800 focus:ring-2 focus:ring-blue-500 tracking-normal focus:outline-none focus:bg-slate-700 transition:colors duration-200 appearance-none w-full text-sm leading-6 text-slate-500 placeholder-slate-400 rounded-md py-3 pl-3 ring-1 ring-slate-200 shadow-sm"
        aria-label="Телефон"
        placeholder="+7"
        v-mask="'+7 ### ### ####'"
        v-model="formData.phone"
      >
    </label>
    <form>
      <label>
        <p class="text-white pb-2 pt-6">Введите пароль</p>
        <input
          class="bg-slate-800 focus:ring-2 focus:ring-blue-500 tracking-normal focus:outline-none focus:bg-slate-700 transition:colors duration-200 appearance-none w-full text-sm leading-6 text-slate-500 placeholder-slate-400 rounded-md py-3 pl-3 ring-1 ring-slate-200 shadow-sm"
          type="password"
          placeholder="********"
          v-model="formData.password"
        >
      </label>
    </form>
    <TxButton class="w-full position:fixed mt-10" :text="'Отправить'" :classes="[isErrorLogin ? 'btn-primary' : 'btn-secondary']" @handle="submitForm"></TxButton>
    <transition-group name="fade-move">
      <TxToast v-if="showToastLoginValid" class="mt-6" status="error" text="Введите все поля для авторизации" @close="showToastLoginValid = false"></TxToast>
    </transition-group>
    <transition name="fade-move">
      <TxToast v-if="showToastLoginAuth" class="mt-6" status="error" text="Неверный логин или пароль" @close="showToastLoginAuth = false"></TxToast>
    </transition>

  </div>
</template>

<script lang="ts" src="./tx-login.ts"></script>
<style src="./tx-login.css"></style>
