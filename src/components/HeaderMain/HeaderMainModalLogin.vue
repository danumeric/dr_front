<template>
  <v-card class="pa-3" width="300">
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="$emit('closeModal')" icon="mdi-close"></v-btn>
    </v-card-actions>
    <v-form ref="add_task" fast-fail @submit.prevent="onSubmit()">
      <v-text-field v-model="authForm.login" label="Логин" :rules="rules"> </v-text-field>

      <v-text-field
        v-model="authForm.password"
        label="Пароль"
        type="password"
        :rules="rules"
      ></v-text-field>
      <p class="text-subtitle-1 text-red">{{ errorMessage }}</p>
      <v-btn type="submit" block class="mt-2">войти</v-btn>
    </v-form>

    <v-divider></v-divider>
  </v-card>
</template>

<script setup lang="ts">
import { defineEmits, reactive, onMounted, defineProps, ref } from 'vue'
import axios from 'axios'

import { useUserDataStore } from '@/store/userData'
const userDataStore = useUserDataStore()
import { IFormAddTask, Status } from '@/models/dish.model'

const emit = defineEmits(['closeModal'])
let errorMessage = ref('')
let authForm = reactive({
  login: 'admin',
  password: 'admin',
})

async function onSubmit() {
  await userDataStore
    .submitAuthForm(authForm)
    .then(() => emit('closeModal'))
    .catch((e) => (errorMessage.value = e.response.data.message))
  if (authForm.login && authForm.password) {
  }

  //
}

let rules = [
  (value: string) => {
    if (value.length > 0) return true
    return 'Поле не должно быть пустым.'
  },
]

onMounted(() => {})
</script>
