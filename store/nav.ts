import { defineStore, acceptHMRUpdate } from 'pinia'

export const useNavStore = defineStore('nav', {
  state: () => {
    return {
      loading: false,
      sidebarCollapsed: false,
      title: ''
    }
  },
  actions: {
    setTitle(title: string) {
      this.title = title
    }
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useNavStore, import.meta.hot))

