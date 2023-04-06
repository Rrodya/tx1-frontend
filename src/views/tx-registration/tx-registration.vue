<template>
  <div class="tx-registration">
    <h1 class="text-center mb-8 mt-6">Введите данные регистрации</h1>
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
    <label>
      <p class="text-white pb-2 pt-6">Введите ваше имя</p>
      <input
        class="bg-slate-800 focus:ring-2 focus:ring-blue-500 tracking-normal focus:outline-none focus:bg-slate-700 transition:colors duration-200 appearance-none w-full text-sm leading-6 text-slate-500 placeholder-slate-400 rounded-md py-3 pl-3 ring-1 ring-slate-200 shadow-sm"
        placeholder="Александр"
        v-model="formData.name"
      >
    </label>
    <div v-if="role === UserRole.DRIVER" class="car-form flex justify-between gap-5">
      <label>
        <p class="text-white pb-2 pt-6">Введите марку машину</p>
        <input
          class="bg-slate-800 focus:ring-2 focus:ring-blue-500 tracking-normal focus:outline-none focus:bg-slate-700 transition:colors duration-200 appearance-none w-full text-sm leading-6 text-slate-500 placeholder-slate-400 rounded-md py-3 pl-3 ring-1 ring-slate-200 shadow-sm"
          placeholder="Lada"
          v-model="formData.carModel"
        >
      </label>
      <label>
        <p class="text-white pb-2 pt-6">Введите номер машины</p>
        <input
          class="bg-slate-800 focus:ring-2 focus:ring-blue-500 tracking-normal focus:outline-none focus:bg-slate-700 transition:colors duration-200 appearance-none w-full text-sm leading-6 text-slate-500 placeholder-slate-400 rounded-md py-3 pl-3 ring-1 ring-slate-200 shadow-sm"
          placeholder="a777aa"
          v-model="formData.carNumber"
        >
      </label>
    </div>
    <form>
      <label>
        <p class="text-white pb-2 pt-6">Введите пароль (пароль должен быть длиннее 8 символов)</p>
        <input
          class="bg-slate-800 focus:ring-2 focus:ring-blue-500 tracking-normal focus:outline-none focus:bg-slate-700 transition:colors duration-200 appearance-none w-full text-sm leading-6 text-slate-500 placeholder-slate-400 rounded-md py-3 pl-3 ring-1 ring-slate-200 shadow-sm"
          type="password"
          placeholder="********"
          v-model="formData.password"
        >
      </label>
    </form>
    <TxButton class="w-full position:fixed mt-10" :text="'Отправить'" :classes="[isErrorReg ? 'btn-primary' : 'btn-secondary']" @handle="submitForm"></TxButton>
    <transition name="fade-move">
      <TxToast v-if="showToastReg" class="mt-6" status="error" text="Введите все поля для регистрации" @close="showToastReg = false"></TxToast>
    </transition>
  </div>
</template>

<script lang="ts" src="./tx-registration.ts"></script>
<style src="./tx-registration.css"></style>
