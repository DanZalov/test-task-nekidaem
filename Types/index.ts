export {}

declare global {
  interface UserData {
    username: string
    email?: string
    password: string
    token: string
  }

  interface TokenData {
    access: string
    refresh: string
  }

  interface ListItem {
    value: string
    id: number
  }

  type ColumnRow = '0' | '1' | '2' | '3'

  interface TasksItem {
    id: number
    row: ColumnRow
    seq_num: number
    text: string
  }

  interface CustomEventType {
    added: {
      newIndex: number
      element: ListItem
    }
  }

  interface DragOptionsProps {
    animation: number
    group: string
    disabled: boolean
    ghostClass: string
  }
}
