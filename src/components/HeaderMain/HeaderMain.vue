<template>
  <v-app-bar color="dark" density="compact">
    <v-app-bar-title class="ml-12">Ресторан Darall</v-app-bar-title>
    <p v-if="userDataStore.isAuthorized" class="mr-5 text-h6">
      Вы зашли как
      {{ userDataStore.userData.login }}
    </p>
    <v-btn size="extra-large" class="px-4 pa-2 mr-12" variant="outlined" @click="loginOrLogout()">{{
      userDataStore.isAuthorized ? 'Выйти' : 'Войти'
    }}</v-btn>
  </v-app-bar>
  <v-dialog v-model="isOpenModalAdd" width="auto">
    <HeaderMainModalLogin @closeModal="isOpenModalAdd = false" />
  </v-dialog>
</template>

<script setup lang="ts">
import HeaderMainModalLogin from '@/components/HeaderMain/HeaderMainModalLogin.vue'
import { useUserDataStore } from '@/store/userData'
import { onMounted } from 'vue'

const userDataStore = useUserDataStore()
import axios from 'axios'

import { ref } from 'vue'
let isOpenModalAdd = ref(false)
onMounted(() => {
  const token = JSON.parse(localStorage.getItem('token'))
  if (token) {
    axios.defaults.headers.common = { Authorization: `bearer ${token}` }
    userDataStore.isAuthorized = true
    userDataStore.userData.login = JSON.parse(localStorage.getItem('loginName'))
  }
})

function loginOrLogout() {
  userDataStore.isAuthorized ? userDataStore.logout() : (isOpenModalAdd.value = true)
}
</script>
<style lang="scss" scoped></style>
