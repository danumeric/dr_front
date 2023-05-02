<template>
  <div class="board-control d-flex justify-end align-center mr-12">
    <v-btn
      prepend-icon="mdi-plus-circle-outline"
      v-if="userDataStore.isAuthorized"
      variant="outlined"
      @click="$emit('openModalAdd')"
      >Добавить блюдо
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { useUserDataStore } from '@/store/userData'

const userDataStore = useUserDataStore()
</script>
<style lang="scss" scoped>
.board-control {
  height: 60px;
}
</style>
