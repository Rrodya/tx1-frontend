<template>
    <div class="one-user-page">
        <div class="one-drive-card" v-if="user">
            <div class="flex justify-between align-top">
                <div>
                    <h1 class="font-bold pt-1 pb-3">{{ user.name }}</h1>
                    <p class=" text-lg">{{user.phone}}</p>
                </div>
                <div v-if="store.state.isAdmin" class="w-3/12">
                    <TxButton class="w-full" :text="'Сформировать отчет'" :classes="['btn-danger']" @handle="makeExcel"></TxButton>
                </div>
            </div>


            <div class="mt-7 mb-5">
                <h2 class="font-bold text-2lg">Поездки</h2>
                <ul class="lex flex-wrap text-sm font-medium border-b border-gray-200 mt-5">
                    <li
                      v-for="tab in tabs"
                      :key="tab.id"
                      class="inline-block p-4 rounded-t-lg transition-all delay-50 cursor-pointer"
                      :class="{'active-tab': tab.isActive}"
                      @click="activeTab(tab.id)"
                    >{{tab.name}}</li>
                </ul>
            </div>
            <div v-if="tabs[0].isActive">
                <div v-if="ownDrives.length">
                    <tx-card-drive
                      v-for="drive in ownDrives"
                      :key="drive.id"
                      :drive="drive"
                      class="mb-5"
                      @click="$router.push('/drive/' + drive._id)"
                    ></tx-card-drive>
                </div>
                <div v-else>
                    <h2>Тут ничего нет</h2>
                </div>
            </div>
            <div v-if="tabs[1].isActive">
                <div v-if="bookedDrives.length">
                    <tx-card-drive
                      v-for="drive in bookedDrives"
                      :key="drive.id"
                      :drive="drive"
                      class="mb-5"
                      @click="$router.push('/drive/' + drive._id)"
                    ></tx-card-drive>
                </div>
                <div v-else>
                    <h2>Тут ничего нет</h2>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./one-user-page.ts"></script>
<style src="./one-user-page.css"></style>
