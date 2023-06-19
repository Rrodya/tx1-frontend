<template>
  <div class="driver-main-page">
    <div
      v-if="isFindOrder || infoOrder.status"
      @click="stopFindOrder"
      class="fixed top-5 left-1/2 -translate-x-1/2"
    >
    <span class="relative flex h-4 w-4">
      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
      <span class="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
    </span>
    </div>
    <div v-if="!infoOrder.status">
      <h2 v-if="!isFindOrder" class="text-center">Здравствуйте, {{ userInfo.name }}. Вы еще не начали смену</h2>
      <div v-else>
        <h2 class="text-center">Ожидаем заказ...</h2>
        <h3 class="text-center">Не забудьте закончить смену.</h3>
      </div>
    </div>
    <div v-if="infoOrder.status" class="mt-10">
      <div>
        <h2 class="mb-5">Пассажир: {{ infoOrder.passenger.name }}</h2>
        <a href="" class="btn btn-primary mt-5">Позвонить</a>
      </div>

      <ol class="relative border-l border-gray-200 dark:border-sky-600 mt-10">
        <li class="mb-20 ml-4">
          <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-sky-300 dark:bg-sky-300"></div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white"><p class="text-white">From:</p> {{infoOrder.drive.from}}</h3>
        </li>
        <li class="ml-4">
          <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-sky-300 dark:bg-sky-300"></div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white"><p class="text-white">To:</p> {{infoOrder.drive.to}}</h3>
        </li>
      </ol>
    </div>
    <TxButton
      v-if="newOrder"
      class="fixed bottom-5 w-11/12 left-1/2 -translate-x-2/4 sm:w-[450px]"
      text="Отклонить"
      :classes="['btn-purple']"
      @click="acceptOrder(3)"
    ></TxButton>
    <TxButton
      v-if="newOrder"
      class="fixed bottom-5 w-11/12 left-1/2 -translate-x-2/4 sm:w-[450px]"
      :text="'Принять (' + currentOrderToAccept.from + ')'"
      :classes="['btn-purple']"
      @click="acceptOrder(1)"
    ></TxButton>
    <TxButton
      v-if="!isFindOrder"
      class="duration-150 transition-all fixed bottom-5 w-11/12 left-1/2 -translate-x-2/4 sm:w-[450px]"
      text="Начать смену"
      :classes="['btn-purple']"
      @click="findOrder"
    ></TxButton>
    <TxButton
      v-if="infoOrder.status"
      class="fixed bottom-5 w-11/12 left-1/2 -translate-x-2/4 sm:w-[450px]"
      text="Закончить поездку"
      :classes="['btn-purple']"
      @click="acceptOrder(2)"
    ></TxButton>
  </div>
</template>

<script lang="ts" src="./driver-main-page.ts"></script>
<style src="./driver-main-page.css"></style>
