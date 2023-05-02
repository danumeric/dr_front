<template>
  <MenuGalleryControl @openModalAdd="openModalAdd()" />
  <v-container class="menu-gallery">
    <v-row justify="center" class="row">
      <v-col
        class="mt-10 d-flex justify-center"
        xs="12"
        md="6"
        lg="4"
        xl="3"
        v-for="dish in dishesData.dishes"
        :key="dish.id"
        ><MenuGalleryCard :dish="dish" @editDish="editDish"
      /></v-col> </v-row
    ><v-dialog v-model="isModalOpen" width="auto">
      <v-card>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="isModalOpen = false" icon="mdi-close"></v-btn> </v-card-actions
        ><MenuGalleryAddModal :editedDish="editedDish" @closeModal="isModalOpen = false" />
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import MenuGalleryControl from '@/components/MenuGallery/MenuGalleryControl.vue'
import MenuGalleryAddModal from '@/components/MenuGallery/MenuGalleryAddModal.vue'
import MenuGalleryCard from '@/components/MenuGallery/MenuGalleryCard.vue'
import { IDish } from '@/models/dish.model'

import { useDishesData } from '@/store/dishesData'
const dishesData = useDishesData()
dishesData.fetchDishes()
let isModalOpen = ref(false)

let editedDish: IDish | undefined = reactive({
  categories: [],
  description: '',
  id: 0,
  imageSrc: '',
  price_rub: 0,
  title: '',
  weight_gramm: 0,
})

onMounted(() => {})
function editDish(id: number) {
  editedDish = dishesData.dishes.find((d) => d.id === id)
  isModalOpen.value = true
}
function openModalAdd() {
  editedDish = {
    categories: [],
    description: '',
    id: 0,
    imageSrc: '',
    price_rub: 0,
    title: '',
    weight_gramm: 0,
  }
  isModalOpen.value = true
}
</script>

<style lang="scss" scoped>
.board-card {
  position: relative;

  &__control {
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>
