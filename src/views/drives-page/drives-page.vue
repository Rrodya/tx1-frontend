<template>
    <div class="drives-page">
<!--        <input-->
<!--          class="bg-slate-800 focus:ring-2 focus:ring-blue-500 tracking-normal focus:outline-none focus:bg-slate-700 transition:colors duration-200 appearance-none w-full text-sm leading-6 text-slate-500 placeholder-slate-400 rounded-md py-3 pl-3 ring-1 ring-slate-200 shadow-sm"-->
<!--          placeholder="Поиск"-->
<!--          v-model="search"-->
<!--        >-->
        <h2 class="pb-10  font-bold text-2xl">Поездки</h2>
        <div class="flex justify-between items-end pb-10 ">
            <div class="flex w-8/12 gap-x-4">
                <TxMainInput
                        text="text"
                        :model-value="formData.from"
                        label="Откуда"
                        class="w-full"
                        @update:modelValue="newValue => formData.from = newValue"
                ></TxMainInput>
                <TxMainInput
                        text="text"
                        :model-value="formData.to"
                        label="Куда"
                        class="w-full"

                        @update:modelValue="newValue => formData.to = newValue"
                ></TxMainInput>
            </div>
            <div class="w-3/12">
                <tx-button class="w-full" text="Поиск" :classes="['btn-primary']" @click="getDrives(true)" ></tx-button>
            </div>
        </div>
        <div class="drives" v-if="! drivesNotFound" ref="scrollComponent">
            <tx-card-drive
              v-for="drive in drives"
              :key="drive.id"
              :drive="drive"
              class="mb-5"
              @click="$router.push('/drive/' + drive.id)"
            ></tx-card-drive>
        </div>
        <div v-else class="w-full flex items-center pt-20 justify-center flex-col">
            <h2 class="font-bold">Тут ничего нет</h2>
            <img src="../../assets/icons/404-error.png" alt="" width="200">
        </div>
        <Popup class="login-page__popup-wrapper" :closed="isOpenDrive" @close="closeOpenDrive">
            <div class="login-page__login-popup" v-if="drive">
                <div class="one-drive-card">
                    <h1 class="font-bold pt-1 pb-3">{{ drive.description }}</h1>
                    <p class="font-bold text-lg">{{drive.name}}</p>
                    <p>Дата отправления: <span class="font-bold ml-5">{{drive.date_start}} {{drive.time_start}}</span></p>
                    <p>Откуда:<span class="font-bold ml-5"> {{drive.from}}</span></p>
                    <p>Куда:<span class="font-bold ml-5">{{drive.to}}</span></p>
                    <p>Свободных мест:<span class="font-bold ml-5"> {{drive.booked_seats}} из {{drive.seats}}</span></p>
                    <a class="text-sky-500" :href="'tel:' + drive.phone">{{drive.phone}}</a>
                    <div v-if="drive.isOwning" class="mt-7" >
                        <h2 class="font-bold ">Пассажиры</h2>
                    </div>
                </div>
                <div class="one-drive-buttons flex flex-col bottom-3 w-full">
                    <tx-button v-if="drive.isOwning && drive.status !== 1" @click="cancelDrive" class="w-full" text="Отменить" :classes="['btn-primary']" ></tx-button>
                    <tx-button v-if="!drive.isOwning && !drive.isBook" @click="toBookSeat" class="w-full" text="Забронировать" :classes="['btn-primary']" ></tx-button>
                    <tx-button v-if="!drive.isOwning && drive.isBook" @click="cancelBook" class="w-full" text="Отменить бронь" :classes="['btn-primary']" ></tx-button>
                    <tx-button v-if="drive.status == 1" disabled class="w-full" text="Отменена" :classes="['btn-secondary']" ></tx-button>
                </div>
            </div>
        </Popup>
    </div>
</template>

<script lang="ts" src="./drives-page.ts"></script>
<style src="./drives-page.css"></style>
