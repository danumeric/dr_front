<template>
  <v-card
    class="dish-card pa-4"
    height="300"
    width="300"
    :title="props.dish.title"
    :subtitle="props.dish.description"
    ><div class="dish-card__image-wrapper">
      <v-img v-if="props.dish.imageSrc" :src="`${api}/img/${props.dish.imageSrc}`"></v-img>
      <v-icon
        size="160"
        color="grey-lighten-3
"
        v-else-if="!props.dish.imageSrc"
        icon="mdi-image-off-outline"
      ></v-icon>
    </div>
    <div class="dish-card__info">
      <p class="dish-card__category">
        {{ props.dish.categories.map((c) => c.title).join(', ') }}
      </p>
      <p class="dish-card__price">
        {{ props.dish.weight_gramm }} гр., {{ props.dish.price_rub }} р.
      </p>
    </div>
    <div v-if="userDataStore.isAuthorized" class="dish-card__control">
      <v-btn
        size="small"
        variant="plain"
        class="dish-card__edit"
        @click="$emit('editDish', dish.id)"
        icon="mdi-pencil"
      ></v-btn
      ><v-btn
        size="small"
        variant="plain"
        class="dish-card__btn dish-card__btn_close"
        @click="dishesData.removeDish(dish.id)"
        icon="mdi-delete"
      ></v-btn>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue'
import { useUserDataStore } from '@/store/userData'
import { useDishesData } from '@/store/dishesData'
const dishesData = useDishesData()
const userDataStore = useUserDataStore()
const emit = defineEmits(['editDish'])
const props = defineProps(['dish'])
const api = process.env.VUE_APP_API_URL
</script>

<style scoped lang="scss">
.dish-card {
  position: relative;

  &__image-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    width: 160px;
    height: 160px;
    img {
      object-fit: fill;
    }
  }
  &__info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.5rem;
  }
  &__category {
    width: 50%;
    font-size: 0.75rem;
  }
  &__price {
    width: 45%;
  }
  &__control {
    position: absolute;
    top: 15px;
    right: 15px;
  }
}
</style>
