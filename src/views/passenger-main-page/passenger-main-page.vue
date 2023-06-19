<template>
  <div class="passenger-main-page">
    <div v-if="!driveInfo.status">
      <h2 v-if="!isLoadingUserInfo" class="text-center">Здравствуйте,
        <span>
        {{ userInfo.name }}
      </span>.
      </h2>
      <h3 class="text-center mb-8"> Куда мы отправимся сегодня?</h3>
      <label>
        <p class="text-white pb-2">Введите ваш адрес</p>
        <input
          class="pr-2 bg-slate-800 focus:ring-2 focus:ring-blue-500 tracking-normal focus:outline-none focus:bg-slate-700 transition:colors duration-200 appearance-none w-full text-sm leading-6 text-slate-500 placeholder-slate-400 rounded-md py-3 pl-3 ring-1 ring-slate-200 shadow-sm"
          aria-label="Телефон"
          v-model="address.from"
          placeholder="Московская 8"
        >
      </label>

      <label>
        <p class="text-white pb-2 pt-6">Введите адрес поездки</p>
        <input
          class="pr-2 bg-slate-800 focus:ring-2 focus:ring-blue-500 tracking-normal focus:outline-none focus:bg-slate-700 transition:colors duration-200 appearance-none w-full text-sm leading-6 text-slate-500 placeholder-slate-400 rounded-md py-3 pl-3 ring-1 ring-slate-200 shadow-sm"
          aria-label="Телефон"
          v-model="address.to"
          placeholder="Пушкина 8"
        >
      </label>
    </div>
    <div v-else>
      <div>
        <h2>Водитель:</h2>
        <p class="text-white">{{driveInfo.driver.name}}</p>
        <p class="mb-4">{{driveInfo.driver.car}}</p>
        <a href="" class="btn btn-primary">Позвонить</a>
      </div>
      <ol class="relative border-l border-gray-200 dark:border-sky-600 mt-10">
        <li class="mb-20 ml-4">
          <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-sky-300 dark:bg-sky-300"></div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white"><p class="text-white">From:</p> {{driveInfo.drive.from}}</h3>
        </li>
        <li class="ml-4">
          <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-sky-300 dark:bg-sky-300"></div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white"><p class="text-white">To:</p> {{driveInfo.drive.to}}</h3>
        </li>
      </ol>
    </div>
    <TxButton
      v-if="!driveInfo.status"
      class="fixed bottom-5 w-11/12 left-1/2 -translate-x-2/4 sm:w-[450px]"
      text="Вызвать такси"
      :classes="[
        (address.from.length < 3 || address.to.length < 3) ?
        'btn-secondary' :
        'btn-purple'
       ]"
      @click="findTaxi"
    ></TxButton>
    <transition name="fade">
      <div v-if="isLoading" class="fixed w-screen h-screen bg-black opacity-50 top-0 left-0">
        <div class="fixed flex flex-col items-center -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2" role="status">
          <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <p class="pr-1 pt-1 text-sky-100">Ищем такси...</p>
          <tx-button class="mt-3 px-8" :classes="'btn-secondary'" text="Отменить" @click="cancelFindTaxi"></tx-button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" src="./passenger-main-page.ts"></script>
<style src="./passenger-main-page.css"></style>
