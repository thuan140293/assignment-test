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
import { computed, shallowRef } from "vue";
import MainLayout from "@/layouts/MainLayout.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
import VerticalNav from "@/components/navigations/VerticalNav.vue";
import { useAuthStore } from "@/stores/auth";
import { useCookie } from "@/composables/useCookie";
import { CookieKeys } from "@/core/enums/commons";

// Stores
const authStore = useAuthStore();

// Composables
const { getCookie } = useCookie();

// Refs
const isAuthenticatedFromCookie = shallowRef<string>("");

// Constants
const currentYear = new Date().getFullYear();

// Created
const getIsAuthenticated = getCookie(CookieKeys.IS_AUTHENTICATED);
isAuthenticatedFromCookie.value = getIsAuthenticated ?? "";

// Computed
const layoutComponent = computed(() =>
  authStore.isAuthenticated || isAuthenticatedFromCookie.value
    ? MainLayout
    : AuthLayout
);
</script>
