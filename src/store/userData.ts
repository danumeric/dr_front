import { AuthForm } from '@/models/user.model'
import { defineStore } from 'pinia'
import axios from 'axios'
import { reactive } from 'vue'

export const useUserDataStore = defineStore({
  id: 'userData',
  state: () => {
    return {
      isAuthorized: false as boolean,
      userData: reactive({ login: '' }),
    }
  },

  actions: {
    async submitAuthForm(authForm: AuthForm) {
      await axios
        .post('/login', authForm)
        .then((response) => {
          console.log(response)
          this.isAuthorized = true

          this.userData.login = response.data.login
          localStorage.setItem('token', JSON.stringify(response.data.token))
          localStorage.setItem('loginName', JSON.stringify(this.userData.login))

          axios.defaults.headers.common = { Authorization: `bearer ${response.data.token}` }
        })
        .catch(function (error) {
          console.log(error)
          throw error
        })
    },
    async logout() {
      this.isAuthorized = false
      this.userData.login = ''
      axios.defaults.headers.common = {}
      localStorage.removeItem('token')
      localStorage.removeItem('loginName')
    },
  },
})
