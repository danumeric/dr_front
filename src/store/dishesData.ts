// @ts-nocheck
import { ICategory, IDish } from '@/models/dish.model'
import axios from 'axios'

import { defineStore } from 'pinia'
export const useDishesData = defineStore({
  id: 'dishesData',
  state: () => {
    return {
      categories: [] as ICategory[],
      dishes: [] as IDish[],
    }
  },

  actions: {
    async fetchCategories() {
      try {
        const res = await axios.get('/categories')
        this.categories = res.data
      } catch (e) {
        console.log(e)
      }
    },
    async fetchDishes() {
      try {
        const res = await axios.get('/dishes')
        this.dishes = res.data
      } catch (e) {
        console.log(e)
      }
    },
    async addNewDish(formAddDish) {
      const res = await axios.post(`/add-dish`, formAddDish)
      const newDishId = res.data.dishData.id

      await this.submitImg(formAddDish.image, newDishId).then((response) => console.log(response))
    },
    async editDish(formAddDish) {
      console.log('formAddDish', formAddDish.categories)

      const res = await axios.post('/edit-dish', formAddDish)
      if (formAddDish.image !== '') {
        const newDishId = res.data.dishData.id
        await this.submitImg(formAddDish.image, newDishId)
        // имя картинки не изменяется, картинка кешируется браузером
        window.location.reload()
      }

      await this.fetchDishes()
    },
    async submitImg(image, newDishId) {
      const formData = new FormData()
      formData.append('image', image)
      const headers = { 'Content-Type': 'multipart/form-data' }
      axios.post(`/upload-img/${newDishId}`, formData, { headers }).then((res) => {
        if (res.data === 'uploaded') {
          console.log('uploaded')
        } else {
          console.log('not uploaded')
        }
      })
    },
    async removeDish(id) {
      await axios.delete(`/delete-dish/${id}`)
      this.fetchDishes()
    },
  },
})
