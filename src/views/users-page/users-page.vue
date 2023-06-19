<template>
    <div class="users-page">
        <h1>Пользователи</h1>
        <ul class="mt-10">
            <li
              v-for="user in users"
              :key="user._id"
              @click="$router.push('/user/' + user._id)"
              class="bg-white drop-shadow-xl rounded-xl p-2 relative cursor-pointer hover:-translate-y-1 transition-transform delay-50 hover:drop-shadow-2xl mb-5"
            >
                <h2 class="font-bold">
                    {{user.name}}
                </h2>
                <p>{{user.phone}}</p>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" src="./users-page.ts"></script>
<style src="./users-page.css"></style>
