const baseURL = 'https://trello.backend.tests.nekidaem.ru/api/v1/'

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    authErrorMessage: '',
    regErrorMessage: { username: [''], password: [''] },
    hold: [] as ListItem[],
    progress: [] as ListItem[],
    review: [] as ListItem[],
    approved: [] as ListItem[],
    accessToken: 'token',
    refreshToken: '',
  }),
  actions: {
    organizeData(fetchedData: TasksItem[]) {
      for (let item of fetchedData) {
        switch (item.row) {
          case '0':
            this.hold[item.seq_num] = {} as ListItem
            this.hold[item.seq_num].value = item.text
            this.hold[item.seq_num].id = item.id
            break
          case '1':
            this.progress[item.seq_num] = {} as ListItem
            this.progress[item.seq_num].value = item.text
            this.progress[item.seq_num].id = item.id
            break
          case '2':
            this.review[item.seq_num] = {} as ListItem
            this.review[item.seq_num].value = item.text
            this.review[item.seq_num].id = item.id
            break
          default:
            this.approved[item.seq_num] = {} as ListItem
            this.approved[item.seq_num].value = item.text
            this.approved[item.seq_num].id = item.id
            break
        }
      }
      this.removeEmpty()
    },
    async getData() {
      try {
        const response = await $fetch<TasksItem[]>('cards/', {
          baseURL,
          headers: {
            Authorization: `JWT ${this.accessToken}`,
          },
        }).catch(async (error) => {
          const errorMessage = error.response._data.detail
          if (errorMessage === 'Given token not valid for any token type') {
            if (this.refreshToken) {
              await this.refreshUserToken()
              await this.getData()
            } else {
              navigateTo('/auth/')
            }
          }
        })
        if (response) {
          this.hold.length =
            this.progress.length =
            this.review.length =
            this.approved.length =
              0
          this.organizeData(response)
          return true
        }
      } catch (error) {
        console.log(error)
        return error
      }
    },
    async addTask(row: ColumnRow, text: string) {
      try {
        const response = await $fetch<TasksItem>('cards/', {
          method: 'POST',
          body: {
            row,
            text,
          },
          baseURL,
          headers: {
            Authorization: `JWT ${this.accessToken}`,
          },
        }).catch(async (error) => {
          const errorMessage = error.response._data.detail
          if (errorMessage === 'Given token not valid for any token type') {
            if (this.refreshToken) {
              await this.refreshUserToken()
              await this.addTask(row, text)
            } else {
              navigateTo('/auth/')
            }
          }
        })
        if (response) {
          this.organizeData([response])
        }
      } catch (error) {
        console.log(error)
        return error
      }
    },
    async updateTask(
      row: ColumnRow,
      text: string,
      id: number,
      seq_num: number,
    ) {
      try {
        const response = await $fetch<TasksItem>(`cards/${id}`, {
          method: 'PATCH',
          body: {
            row,
            text,
            seq_num,
          },
          baseURL,
          headers: {
            Authorization: `JWT ${this.accessToken}`,
          },
        }).catch(async (error) => {
          const errorMessage = error.response._data.detail
          if (errorMessage === 'Given token not valid for any token type') {
            if (this.refreshToken) {
              await this.refreshUserToken()
              await this.updateTask(row, text, id, seq_num)
            } else {
              navigateTo('/auth/')
            }
          }
        })
        if (response) {
          this.organizeData([response])
        }
      } catch (error) {
        console.log(error)
        return error
      }
    },
    async removeTask(id: number) {
      try {
        await $fetch<TasksItem>(`cards/${id}`, {
          method: 'DELETE',
          baseURL,
          headers: {
            Authorization: `JWT ${this.accessToken}`,
          },
        }).catch(async (error) => {
          const errorMessage = error.response._data.detail
          if (errorMessage === 'Given token not valid for any token type') {
            if (this.refreshToken) {
              await this.refreshUserToken()
              await this.removeTask(id)
            } else {
              navigateTo('/auth/')
            }
          }
        })
      } catch (error) {
        console.log(error)
        return error
      }
    },
    async registerUser(login: string, password: string, email?: string) {
      try {
        const response = await $fetch<UserData>('users/create/', {
          method: 'POST',
          body: {
            username: login,
            password: password,
            email,
          },
          baseURL,
        }).catch((error) => {
          this.regErrorMessage.username = error.data.username
          this.regErrorMessage.password = error.data.password
        })
        if (response?.username) {
          navigateTo('/auth/')
        }
      } catch (error) {
        console.log(error)
        return error
      }
    },
    async createUserToken(login: string, password: string) {
      try {
        const response = await $fetch<TokenData>('users/token/', {
          method: 'POST',
          body: {
            username: login,
            password: password,
          },
          baseURL,
        }).catch((error) => {
          this.authErrorMessage = error.response._data.detail
        })
        if (response?.access) {
          this.accessToken = response.access
          this.refreshToken = response.refresh
          navigateTo('/board/')
        }
      } catch (error) {
        console.log(error)
        return error
      }
    },
    async refreshUserToken() {
      try {
        const response = await $fetch<TokenData>('users/token/refresh/', {
          method: 'POST',
          body: {
            refresh: this.refreshToken,
          },
          baseURL,
        })
        if (response?.access) {
          this.accessToken = response.access
        }
      } catch (error) {
        console.log(error)
        navigateTo('/auth')
        return error
      }
    },
    removeEmpty() {
      if (this.hold.length > 0) {
        for (let i = 0; i < this.hold.length; i++) {
          if (this.hold[i] === undefined) {
            this.hold.splice(i, 1)
            i--
          }
        }
      }
      if (this.progress.length > 0) {
        for (let i = 0; i < this.progress.length; i++) {
          if (this.progress[i] === undefined) {
            this.progress.splice(i, 1)
            i--
          }
        }
      }
      if (this.review.length > 0) {
        for (let i = 0; i < this.review.length; i++) {
          if (this.review[i] === undefined) {
            this.review.splice(i, 1)
            i--
          }
        }
      }
      if (this.approved.length > 0) {
        for (let i = 0; i < this.approved.length; i++) {
          if (this.approved[i] === undefined) {
            this.approved.splice(i, 1)
            i--
          }
        }
      }
    },
    getArrValues(index: number) {
      switch (index) {
        case 0:
          return this.hold
        case 1:
          return this.progress
        case 2:
          return this.review

        default:
          return this.approved
      }
    },
  },
  persist: true,
})
