<template>
  <div class="driver-main py-20">
    <h1 class="text-center">Сделайте выбор.</h1>
    <h3 class="text-center mt-6"><br><br></h3>
    <div class="w-full flex flex-col mt-32 items-center md:w-1/3 m-auto">
      <TxButton class="w-full" :classes="['btn-primary']" text="Регистрация" @handle="$router.push({path: '/driver/registration'})"></TxButton>
      <TxButton class="mt-3 w-full" :classes="['btn-primary']" text="Авторизация" @handle="$router.push({path: '/driver/login'})"></TxButton>
      <p @click="$router.go(-1)" class="m-3 cursor-pointer">Назад к выбору роли</p>
    </div>
  </div>
</template>

<script lang="ts" src="./driver-main.ts"></script>
<style src="./driver-main.css"></style>
