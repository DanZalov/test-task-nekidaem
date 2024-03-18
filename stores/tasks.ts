export interface ListItem {
  value: string
  id: number
}

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
    hold: defaultList1,
    progress: defaultList2,
    review: defaultList1,
    approved: defaultList2,
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
  },
  persist: true,
})
