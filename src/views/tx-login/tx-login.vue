<template>
  <div class="tx-login full-container">
    <h1 class="text-center mb-8 mt-6">Введите данные авторизации</h1>
      <TxMainInput
        text="phone"
        :model-value="formData.phone"
        label="Введите номер телефона"
        @update:modelValue="newValue => formData.phone = newValue"
      ></TxMainInput>
      <TxMainInput
        text="password"
        :model-value="formData.password"
        label="Введите пароль (пароль должен быть длиннее 8 символов)"
        @update:modelValue="newValue => formData.password = newValue"
        placeholder="Пароль"
      ></TxMainInput>
    <TxButton class="w-full position:fixed mt-10" :text="'Отправить'" :classes="[isErrorLogin ? 'btn-primary' : 'btn-secondary']" @handle="submitForm"></TxButton>
    <transition-group name="fade-move">
      <TxToast v-if="showToastLoginValid" class="mt-6" status="error" text="Введите все поля для авторизации" @close="showToastLoginValid = false"></TxToast>
    </transition-group>
    <transition name="fade-move">
      <TxToast v-if="showToastLoginAuth" class="mt-6" status="error" text="Неверный номер телефона или пароль" @close="showToastLoginAuth = false"></TxToast>
    </transition>
    <transition name="fade-move">
      <TxToast v-if="showToastLoginRole" class="mt-6" status="error" text="Вы неправильно выбрали роль на первом экране. Вернитесь и выбирете корректную роль." @close="showToastLoginRole = false"></TxToast>
    </transition>
  </div>
</template>

<script lang="ts" src="./tx-login.ts"></script>
<style src="./tx-login.css"></style>
