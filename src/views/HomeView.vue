<template>
  <HeaderMain />
  <MenuGallery />
  <v-footer class="pa-4">
    <v-row justify="center" no-gutters>
      <v-col class="text-center mt-2" cols="12">
        {{ new Date().getFullYear() }} — Ресторан Darall
      </v-col>
    </v-row>
  </v-footer>
</template>

<script setup lang="ts">
// Components
import HeaderMain from '@/components/HeaderMain/HeaderMain.vue'
import MenuGallery from '@/components/MenuGallery/MenuGallery.vue'
</script>
