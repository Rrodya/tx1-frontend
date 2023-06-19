<template>
    <div class="tx-card-drive bg-white drop-shadow-xl rounded-xl p-2 relative cursor-pointer hover:-translate-y-1 transition-transform delay-50 hover:drop-shadow-2xl">
        <p class="text-sm w-10/12 font-bold">{{drive.description}}</p>
        <p class="text-xs mt-1">{{drive.name}}</p>
        <div class="path flex mt-1">
            <p class="pr-3">{{drive.from}}</p>
            <p class="pl3">{{drive.to}}</p>
        </div>
        <p class="absolute right-2 top-2">{{drive.booked_seats}} / {{drive.seats}}</p>
        <p class="absolute right-2 bottom-2 text-white">{{drive.created_at}}</p>
    </div>
</template>

<script lang="ts" src="./tx-card-drive.ts"></script>
<style src="./tx-card-drive.css"></style>
