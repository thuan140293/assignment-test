import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as string | null,
    isAuthenticated: false,
  }),
  actions: {
    setCookie(name: string, value: string, days = 7) {
      const expires = new Date(Date.now() + days * 864e5).toUTCString()
      document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`
    },
    login(username: string, password: string) {
      if (username === 'user_test' && password === '12345') {
        this.user = username
        this.isAuthenticated = true
        this.setCookie('username', username)
        this.setCookie('loggedIn', 'true')
        return true
      }
      throw new Error('Invalid credentials')
    },
    logout() {
      this.user = null
      this.isAuthenticated = false
      this.setCookie('username', '', -1)
      this.setCookie('loggedIn', '', -1)
    },
  },
})