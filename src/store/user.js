import axiosClient from "@/axios";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    loading: false,
  }),
  actions: {
    async fetchUser() {
      try {
        this.loading = true;
        
        const { data } = await axiosClient.get('/api/user');
        this.user = data;
        return data;
      } catch (e) {
        this.user = null;
        
      } finally {
        this.loading = false;
      }
    },

    async register(payload) {
      // Ensure CSRF cookie for Laravel Sanctum
      await axiosClient.get('/sanctum/csrf-cookie');
      await axiosClient.post('/register', payload);
      await this.fetchUser();
    },

    async login(payload) {
      await axiosClient.get('/sanctum/csrf-cookie');
      await axiosClient.post('/login', payload);
      await this.fetchUser();
    },

    async logout() {
      try {
        await axiosClient.post('/logout');
      } finally {
        this.user = null;
      }
    },
  },
});
