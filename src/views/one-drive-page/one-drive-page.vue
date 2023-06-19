<template>
    <div v-if="drive" class="flex justify-between relative">
        <a class="absolute -top-5 font-bold" @click="$router.go(-1)">Назад</a>
        <div class="one-drive-page pr-5">
            <div class="one-drive-card">
                <h1 class="font-bold pt-1 pb-3">{{ drive.description }}</h1>
                <div class="p-5 bg-white rounded-xl">
                    <div class="flex">
                        <div>
                            <p class="">Водитель: </p>
                            <p>Дата отправления: </p>
                            <p>Откуда:</p>
                            <p>Куда:</p>
                            <p>Свободных мест:</p>
                            <p>Стоимость: </p>
                            <p>Телефон:</p>
                        </div>
                        <div class="ml-10">
                            <p class="font-bold ml-5 text-lg">{{drive.name}}</p>
                            <p class="font-bold ml-5">{{drive.date_start}} {{drive.time_start}}</p>
                            <p class="font-bold ml-5"> {{drive.from}}</p>
                            <p class="font-bold ml-5">{{drive.to}}</p>
                            <p class="font-bold ml-5"> {{drive.booked_seats}} из {{drive.seats}}</p>
                            <p class="font-bold ml-5">{{ drive.price}}</p>
                            <a class="text-sky-500 ml-5" :href="'tel:' + drive.phone">{{drive.phone}}</a>
                        </div>
                    </div>
                    <div class="w-full pt-4">
                        <tx-button
                          v-if="!drive.isOwning"
                          @click="$router.push('/user/' + drive.author_id)"
                          class="w-full"
                          text="Другие поездки водителя"
                          :classes="['btn-primary']">
                        </tx-button>
                    </div>
                </div>
                <div v-if="drive.isOwning && books.length" class="mt-7">
                    <h2 class="font-bold text-2lg pb-5">Пассажиры</h2>
                    <div v-for="book in books" :key="book._id" class="bg-white p-5 rounded-xl mb-5">
                        <div class="flex">
                            <div>
                                <p>Кол-во мест забранировано:</p>
                                <p>Имя:</p>
                                <p>Телефон:</p>
                                <p v-if="formData.description">Комментарий:</p>
                            </div>
                            <div class="ml-10">
                                <p class="font-bold ml-5">{{book.seats}}</p>
                                <p class="font-bold ml-5">{{ book.name }}</p>
                                <p class="font-bold ml-5">{{book.phone}}</p>
                                <p class="font-bold ml-5">{{ book.description}}</p>
                            </div>
                        </div>
                        <div v-if="drive.status !== 1" class="mt-3 w-full">
                            <a :href="'tel:' + drive.phone">
                                <tx-button class="w-full mb-2" text="Позвонить" :classes="['btn-primary']" ></tx-button>
                            </a>
                            <tx-button class="w-full text-purple-900" @click="cancelBook(book.author_id)" text="Отменить бронь" :classes="['btn-secondary']"></tx-button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-7 bg-white rounded-xl p-4" v-if="drive.isBook">
                <h2 class="font-bold">Забранировано</h2>
                <div class="flex">
                    <div>
                        <p>Кол-во мест забранировано:</p>
                        <p>Имя: </p>
                        <p>Телефон:</p>
                        <p v-if="formData.description">Комментарий: </p>
                    </div>
                    <div class="ml-10">
                        <p class="font-bold ml-5">{{formData.count_seats}}</p>
                        <p class="font-bold ml-5">{{ formData.name }}</p>
                        <p class="font-bold ml-5">{{formData.phone}}</p>
                        <p class="font-bold ml-5">{{ formData.description}}</p>
                    </div>
                </div>
            </div>
            <div v-if="isAddBook" class="mt-7">
                <h2 class="font-bold mb-3">Форма для бронирования</h2>
                <TxMainInput
                  :model-value="formData.name"
                  label="Введите ваше имя"
                  text="text"
                  @update:modelValue="newValue => formData.name = newValue"
                  placeholder="Имя"
                ></TxMainInput>
                <TxMainInput
                  text="phone"
                  class="mb-3"
                  :model-value="formData.phone"
                  label="Введите номер телефона"
                  @update:modelValue="newValue => formData.phone = newValue"
                ></TxMainInput>
                <TxMainInput
                  text="number"
                  :model-value="formData.count_seats"
                  label="Количество мест"
                  @update:modelValue="newValue => formData.count_seats = newValue"
                ></TxMainInput>
                <TxMainInput
                  text="textarea"
                  :model-value="formData.description"
                  label="Описание"
                  @update:modelValue="newValue => formData.description = newValue"
                ></TxMainInput>
                <tx-button
                  v-if="!drive.isBook"
                  @click="submitForm"
                  text="Отправить"
                  :classes="['btn-primary']"
                  class="w-full mt-5"
                ></tx-button>
            </div>
        </div>
        <div class="one-drive-buttons flex flex-col bottom-3 w-4/12">
            <div v-if="store.state.isAdmin">
                <tx-button
                  @click="deleteDrive"
                  class="w-full" text="Удалить"
                  :classes="['btn-danger']"
                ></tx-button>
            </div>
            <div v-else>
                <tx-button v-if="(drive.isOwning || drive.isBook) && drive.status == 1" @click="getFileDrive" class="w-full mb-3" text="Выгрузить поездку" :classes="['btn-primary']" ></tx-button>
                <tx-button v-if="drive.isOwning || drive.isBook && drive.status !== 1"  @click="openComments" class="w-full mb-3" text="Открыть комментарии" :classes="['btn-primary']" ></tx-button>
                <tx-button v-if="drive.isOwning && drive.status !== 1" @click="cancelDrive" class="w-full" text="Отменить" :classes="['btn-primary']" ></tx-button>
                <tx-button v-if="!drive.isOwning && !drive.isBook && drive.status !== 1" @click="toBookSeat" class="w-full" text="Забронировать" :classes="['btn-primary']" ></tx-button>
                <tx-button v-if="!drive.isOwning && drive.isBook && drive.status !== 1" @click="cancelBook" class="w-full" text="Отменить бронь" :classes="['btn-primary']" ></tx-button>
                <tx-button v-if="drive.status == 1" disabled class="w-full" text="Отменена" :classes="['btn-secondary']" ></tx-button>
            </div>

        </div>
        <transition name="fade-move">
            <TxToast
              v-if="toast.active"
              class="fixed top-5 right-5"
              status="error"
              :text="toast.text"
              @close="toast.active = false">
            </TxToast>
        </transition>
        <Popup class="login-page__popup-wrapper" :closed="isOpenComments" @close="closeOpenComments">
            <div class="login-page__login-popup relative" v-if="drive">
                <div class="one-drive-card min-h-20 h-40">

                </div>
                <div class="flex flex-col bottom-3 w-full absolute b-5">
                    <TxMainInput
                      text="textarea"
                      :model-value="newComment"
                      label="Комментарий"
                      @update:modelValue="newValue => newComment = newValue"
                    ></TxMainInput>
                    <tx-button @click="sendComment" class="w-full" text="Отправить" :classes="['btn-primary']" ></tx-button>
                </div>
            </div>
        </Popup>
    </div>
    <div v-else>
        <h1>Данная поездка была удалена</h1>
    </div>
</template>

<script lang="ts" src="./one-drive-page.ts"></script>
<style src="./one-drive-page.css"></style>
