import { defineStore } from 'pinia'
import type { LoginFormType } from "@/core/types";
import { useCookie } from "@/composables/useCookie";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as string | null,
    isAuthenticated: false,
  }),
  actions: {
    async login(payload: LoginFormType) {
      const { setCookie } = useCookie();
      if (payload.username === 'user_test' && payload.password === '12345') {
        this.user = payload.username;
        this.isAuthenticated = true;
        setCookie('username', payload.username, 7 * 24 * 3600);
        setCookie('isAuthenticated', 'true', 7 * 24 * 3600);
        return true;
      }
      throw new Error('Invalid credentials');
    },
    logout() {
      const { setCookie, deleteCookie } = useCookie();
      this.user = null;
      this.isAuthenticated = false;
      deleteCookie('username');
      deleteCookie('isAuthenticated');
    },
  },
})