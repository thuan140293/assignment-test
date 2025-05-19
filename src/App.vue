<template>
  <transition name="fade" mode="out-in">
    <component :is="layoutComponent">
      <template v-slot:aside>
        <VerticalNav />
      </template>
      <template v-slot:main>
        <RouterView />
      </template>
      <template v-slot:footer>
        <small>Copyright@ {{ currentYear }}</small>
      </template>
    </component>
  </transition>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import MainLayout from "@/layouts/MainLayout.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
import VerticalNav from "@/components/navigations/VerticalNav.vue";
import { useAuthStore } from "@/stores/auth";

// Stores
const authStore = useAuthStore();

// Constants
const currentYear = new Date().getFullYear();

// Computed
const layoutComponent = MainLayout;
// const layoutComponent = computed(() =>
//   authStore.isAuthenticated ? MainLayout : AuthLayout
// );
</script>
