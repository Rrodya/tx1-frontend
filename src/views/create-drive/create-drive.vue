<template>
    <div class="create-drive full-container">
        <TxMainInput
          :model-value="formData.name"
          label="Введите ваше имя"
          text="text"
          @update:modelValue="newValue => formData.name = newValue"
          placeholder="Александр"
        ></TxMainInput>
        <TxMainInput
          text="phone"
          class="mb-3"
          :model-value="formData.phone"
          label="Введите номер телефона"
          @update:modelValue="newValue => formData.phone = newValue"
        ></TxMainInput>
        <vs-input
          warn
          type="time"
          v-model="formData.time_start"
          label="Дата и время"
        />
        <vs-input
          primary
          type="date"
          class="mt-2"
          v-model="formData.date_start"
        />
        <TxMainInput
          text="number"
          :model-value="formData.phone"
          label="Количество мест"
          placeholder="1"
          @update:modelValue="newValue => formData.seats = newValue"
        ></TxMainInput>
        <TxMainInput
          text="text"
          :model-value="formData.from"
          label="Откуда"
          placeholder="Кармаскалы"
          @update:modelValue="newValue => formData.from = newValue"
        ></TxMainInput>
        <TxMainInput
          text="text"
          :model-value="formData.to"
          label="Куда"
          placeholder="Уфа"
          @update:modelValue="newValue => formData.to = newValue"
        ></TxMainInput>
        <TxMainInput
          text="text"
          :model-value="formData.car"
          label="Машина"
          placeholder="Лада а777аа"
          @update:modelValue="newValue => formData.car = newValue"
        ></TxMainInput>
        <TxMainInput
          text="textarea"
          :model-value="formData.description"
          label="Описание"
          placeholder="Вечером в 8 часов еду из Кармаскалов в Уфу, лада веста"
          @update:modelValue="newValue => formData.description = newValue"
        ></TxMainInput>
        <TxMainInput
          text="number"
          :model-value="formData.price"
          label="Цена"
          placeholder="rub"
          @update:modelValue="newValue => formData.price = newValue"
        ></TxMainInput>
        <TxButton class="w-full mt-10" :text="'Создать'" :classes="['btn-primary']" @handle="sumbitForm"></TxButton>
        <transition name="fade-move">
            <TxToast
              v-if="toast.active"
              class="fixed top-5 right-5"
              status="error"
              :text="toast.text"
              @close="toast.active = false">
            </TxToast>
        </transition>
    </div>
</template>

<script lang="ts" src="./create-drive.ts"></script>
<style src="./create-drive.css"></style>
