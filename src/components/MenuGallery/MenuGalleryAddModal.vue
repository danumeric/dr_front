<template>
  <v-card class="pa-3 modal-add" width="300">
    <v-form ref="add_dish" fast-fail @submit.prevent="onSubmit()">
      <v-text-field
        density="compact"
        v-model="formAddDish.title"
        label="Наименование блюда"
        :rules="rulesStr"
      ></v-text-field>

      <v-text-field
        density="compact"
        v-model="formAddDish.description"
        label="Описание блюда"
        :rules="rulesStr"
      ></v-text-field
      ><v-text-field
        density="compact"
        v-model="formAddDish.priceRub"
        label="Цена (руб.)"
        type="number"
        :rules="rulesNum"
      ></v-text-field>
      <v-text-field
        density="compact"
        v-model="formAddDish.weightGramm"
        label="Вес (гр.)"
        type="number"
        :rules="rulesNum"
      ></v-text-field>
      <v-select
        :rules="rulesCategory"
        density="compact"
        v-model="formAddDish.categories"
        :items="dishesData.categories"
        label="Выберите категории"
        multiple
        return-object
        hint="Выберите категории"
      ></v-select>
      <v-file-input
        density="compact"
        :clearable="false"
        accept="image/jpeg,image/png,image/gif"
        :label="url ? 'Измените изображение' : 'Выберите изображение'"
        @change="onImageChange"
      ></v-file-input>
      <div class="d-flex align-center">
        <v-img class="" width="200" max-height="200" v-if="url" :src="url" />
      </div>
      <v-btn type="submit" block class="mt-2">{{
        props.editedDish.id !== 0 ? 'Сохранить' : 'Создать'
      }}</v-btn>
    </v-form>

    <v-divider></v-divider>
  </v-card>
</template>

<script setup lang="ts">
import { defineEmits, reactive, onMounted, defineProps, ref } from 'vue'
import { useDishesData } from '@/store/dishesData'
const dishesData = useDishesData()
import { IFormAddDish } from '@/models/dish.model'
const add_dish = ref(null)
dishesData.fetchCategories()

const emit = defineEmits(['closeModal'])
const props = defineProps(['editedDish'])
let url = ref('')
let formAddDish: IFormAddDish = reactive({
  title: '',
  description: '',
  priceRub: 0,
  weightGramm: 0,
  categories: [],
  image: '',
})
function onImageChange(e) {
  const file = e.target.files[0]
  url.value = URL.createObjectURL(file)
  formAddDish.image = e.target.files[0]
}
function onSubmit() {
  add_dish.value.validate().then((r) => {
    if (r.valid) {
      if (props.editedDish.id !== 0) {
        dishesData.editDish(formAddDish)
        emit('closeModal')
        return
      }
      dishesData.addNewDish(formAddDish)
      emit('closeModal')
    }
  })
}

let rulesStr = [
  (value: string) => {
    if (value.length > 0) return true
    return 'Поле не должно быть пустым.'
  },
]
let rulesNum = [
  (value: number) => {
    if (value > 0) return true
    return 'Значение должно быть боьше 0.'
  },
]
let rulesCategory = [
  (value) => {
    if (value.length > 0) return true
    return 'Выбирете хотя бы 1 категорию'
  },
]
onMounted(() => {
  if (props.editedDish.id !== 0) {
    console.log(props.editedDish)
    formAddDish.id = props.editedDish.id
    formAddDish.title = props.editedDish.title
    formAddDish.description = props.editedDish.description
    formAddDish.priceRub = props.editedDish.price_rub
    formAddDish.weightGramm = props.editedDish.weight_gramm
    formAddDish.categories = props.editedDish.categories
    url.value = `${process.env.VUE_APP_API_URL}/img/${props.editedDish.imageSrc}`
  }
})
</script>
<style lang="scss" scoped>
.modal-add {
  -ms-overflow-style: none;
  overflow-y: scroll;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none !important;
  }
}
</style>
