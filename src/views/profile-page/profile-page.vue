<template>
    <div class="profile-page" v-if="user">
        <h1 class="font-bold">{{ user.name }}</h1>
        <p class="">{{ user.phone }}</p>
        <h2 class="text-sm font-bold mt-5">Мои поездки</h2>
        <div v-if="my_drives.length">
            <tx-card-drive
              v-for="drive in my_drives"
              :key="drive.id"
              :drive="drive"
              class="mb-5"
              @click="$router.push('/drive/' + drive.id)"
            ></tx-card-drive>
        </div>
    </div>
</template>

<script lang="ts" src="./profile-page.ts"></script>
<style src="./profile-page.css"></style>
