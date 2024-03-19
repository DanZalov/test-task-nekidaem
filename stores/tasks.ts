export interface ListItem {
  value: string
  id: number
}

export interface UserData {
  username: string
  email?: string
  password: string
  token: string
}

export interface TokenData {
  access: string
  refresh: string
}

export type ColumnRow = '0' | '1' | '2' | '3'

export interface TasksItem {
  id: number
  row: ColumnRow
  seq_num: number
  text: string
}

const baseURL = 'https://trello.backend.tests.nekidaem.ru/api/v1/'

const defaultList1: ListItem[] = [
  {
    value: 'vue.draggable',
    id: 0,
  },
  {
    value: 'draggable',
    id: 1,
  },
  {
    value: 'component',
    id: 2,
  },
  {
    value: 'for',
    id: 3,
  },
  {
    value: 'vue.js 2.0',
    id: 4,
  },
  {
    value: 'based',
    id: 5,
  },
  {
    value: 'on',
    id: 6,
  },
  {
    value: 'Sortablejs',
    id: 7,
  },
]

const defaultList2: ListItem[] = [
  {
    value: 'vue.draggable.next',
    id: 10,
  },
  {
    value: 'draggable',
    id: 11,
  },
  {
    value: 'component',
    id: 12,
  },
  {
    value: 'for',
    id: 13,
  },
  {
    value: 'next 3.0',
    id: 14,
  },
  {
    value: 'based',
    id: 15,
  },
  {
    value: 'on',
    id: 16,
  },
  {
    value: 'Sortablejs',
    id: 17,
  },
]

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    login: 'DanilApiTest',
    password: 'ComplexPass',
    hold: defaultList1,
    progress: defaultList2,
    review: defaultList1,
    approved: defaultList2,
    accessToken: '',
    refreshToken: '',
  }),
  actions: {
    getArrValues(index: number) {
      switch (index) {
        case 0:
          return this.hold
          break
        case 1:
          return this.progress
          break
        case 2:
          return this.review
          break

        default:
          return this.approved
          break
      }
    },
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
    },
    async getData() {
      if (this.accessToken) {
        try {
          const { data, error } = await useFetch<TasksItem[]>('cards/', {
            baseURL,
            headers: {
              Authorization: `JWT ${this.accessToken}`,
            },
          })
          if (data.value) {
            this.hold.length =
              this.progress.length =
              this.review.length =
              this.approved.length =
                0
            this.organizeData(data.value)
          } else if (
            error.value?.data.detail ===
            'Given token not valid for any token type'
          ) {
            await this.createUserToken()
            await this.getData()
          }
        } catch (error) {
          console.log(error)
          return error
        }
      } else {
        await this.createUserToken()
        await this.getData()
      }
    },
    async addTask(row: ColumnRow, text: string) {
      if (this.accessToken) {
        try {
          const { data, error } = await useFetch<TasksItem>('cards/', {
            method: 'POST',
            body: {
              row,
              text,
            },
            baseURL,
            headers: {
              Authorization: `JWT ${this.accessToken}`,
            },
          })
          if (data.value) {
            this.organizeData([data.value])
          } else if (
            error.value?.data.detail ===
            'Given token not valid for any token type'
          ) {
            await this.createUserToken()
            await this.addTask(row, text)
          }
        } catch (error) {
          console.log(error)
          return error
        }
      } else {
        await this.createUserToken()
        await this.addTask(row, text)
      }
    },
    async updateTask(
      row: ColumnRow,
      text: string,
      id: number,
      seq_num: number,
    ) {
      if (this.accessToken) {
        try {
          const { data, error } = await useFetch<TasksItem>(`cards/${id}`, {
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
          })
          if (data.value) {
            this.organizeData([data.value])
          } else if (
            error.value?.data.detail ===
            'Given token not valid for any token type'
          ) {
            await this.createUserToken()
            await this.updateTask(row, text, id, seq_num)
          }
        } catch (error) {
          console.log(error)
          return error
        }
      } else {
        await this.createUserToken()
        await this.updateTask(row, text, id, seq_num)
      }
    },
    async removeTask(id: number) {
      if (this.accessToken) {
        try {
          const { error } = await useFetch<TasksItem>(`cards/${id}`, {
            method: 'DELETE',
            baseURL,
            headers: {
              Authorization: `JWT ${this.accessToken}`,
            },
          })
          if (
            error.value?.data.detail ===
            'Given token not valid for any token type'
          ) {
            await this.createUserToken()
            await this.removeTask(id)
          }
        } catch (error) {
          console.log(error)
          return error
        }
      } else {
        await this.createUserToken()
        await this.removeTask(id)
      }
    },
    async registerUser() {
      try {
        const { data } = await useFetch<UserData>('users/create/', {
          method: 'POST',
          body: {
            username: this.login,
            password: this.password,
          },
          baseURL,
        })
        if (data.value?.token) {
          this.accessToken = data.value.token
        }
      } catch (error) {
        console.log(error)
        return error
      }
    },
    async createUserToken() {
      try {
        const { data } = await useFetch<TokenData>('users/token/', {
          method: 'POST',
          body: {
            username: this.login,
            password: this.password,
          },
          baseURL,
        })
        if (data.value?.access) {
          this.accessToken = data.value.access
          this.refreshToken = data.value.refresh
        }
      } catch (error) {
        console.log(error)
        return error
      }
    },
    async refreshUserToken() {
      try {
        const { data } = await useFetch<TokenData>('users/token/refresh/', {
          method: 'POST',
          body: {
            refresh: this.refreshToken,
          },
          baseURL,
        })
        if (data.value?.access) {
          this.accessToken = data.value.access
        }
      } catch (error) {
        console.log(error)
        return error
      }
    },
  },
  persist: true,
})
