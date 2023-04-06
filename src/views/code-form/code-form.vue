<template>
  <div class="code-form">
    <h1 class="mt-6 mb-8 text-center">Введите код смс</h1>
    <input
      class="text-center pr-2 bg-slate-800 focus:ring-2 focus:ring-blue-500 tracking-normal focus:outline-none focus:bg-slate-700 transition:colors duration-200 appearance-none w-full text-sm leading-6 text-slate-500 placeholder-slate-400 rounded-md py-3 pl-3 ring-1 ring-slate-200 shadow-sm"
      aria-label="Телефон"
      placeholder="•  •  •  •"
      v-mask="'# # # #'"
      type="tel"
      v-model="code"
    >
    <TxButton class="w-full position:fixed mt-10 transition:colors duration-150" :text="'Отправить'" :classes="[code.length === 7 ? 'btn-primary' : 'btn-secondary']" @handle="sendCode"></TxButton>
    <transition name="fade-move">
      <TxToast v-if="isErrorCode" class="w-full mt-5" status="error" text="Неверный код" @close="isErrorCode = false"/>
    </transition>
  </div>
</template>

<script lang="ts" src="./code-form.ts"></script>
<style src="./code-form.css"></style>
