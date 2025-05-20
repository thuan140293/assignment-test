<template>
  <div class="vertical-nav-wrapper">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-vertical"
      router
      :collapse="isCollapse"
    >
      <template v-for="item in menu">
        <el-sub-menu
          v-if="item.children"
          :index="item.index"
          :key="item.index + '-submenu'"
        >
          <template #title>
            <el-icon v-if="item.icon"><component :is="item.icon" /></el-icon>
            <span>{{ item.title }}</span>
          </template>
          <el-menu-item
            v-for="child in item.children"
            :index="child.index"
            :key="child.index"
          >
            <el-icon v-if="child.icon" class="menu-child-icon">
              <component :is="child.icon" />
            </el-icon>
            <span>{{ child.title }}</span>
          </el-menu-item>
        </el-sub-menu>

        <el-menu-item
          v-else
          :index="item.index"
          :key="item.index + '-item'"
          :disabled="item.disabled"
        >
          <el-icon v-if="item.icon"><component :is="item.icon" /></el-icon>
          <span>{{ item.title }}</span>
        </el-menu-item>
      </template>

      <!-- Account info at bottom -->
      <div class="menu-account-row">
        <template v-if="!isLargeDesktop">
          <el-dropdown trigger="click" class="account-dropdown">
            <span class="dropdown-trigger">
              <el-avatar size="small" class="avatar">
                {{ initial }}
              </el-avatar>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click.native.prevent="handleLogout">
                  Logout
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
        <template v-else>
          <span class="menu-username">{{ username }}</span>
          <el-button size="small" @click="handleLogout">Logout</el-button>
        </template>
      </div>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { computed, shallowRef, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { User, Document } from "@element-plus/icons-vue";
import { useCookie } from "@/composables/useCookie";
import { useMediaQuery } from "@/composables/useMediaQuery";
import { useAuthStore } from "@/stores/auth";
import { CookieKeys, MediaScreen } from "@/core/enums/commons";
import { MenuItemType } from "@/core/types";

// Constants
const menu: MenuItemType[] = [
  { index: "/posts", title: "Posts", icon: Document },
  { index: "/users", title: "Users", icon: User },
];

// Composables
const route = useRoute();
const router = useRouter();
const { getCookie } = useCookie();
const authStore = useAuthStore();
const { matches: isLargeDesktop } = useMediaQuery(
  `(min-width: ${MediaScreen.LARGE_DESKTOP})`
);

// Refs
const isCollapse = shallowRef<boolean>(true);

// Computed
const activeIndex = computed(() => route.path);
const username = computed(() => getCookie(CookieKeys.USER_NAME) || "");
const initial = computed(() => username.value.charAt(0).toUpperCase());

// watch
watch(
  isLargeDesktop,
  (newVal) => {
    isCollapse.value = !newVal;
  },
  { immediate: true }
);

// Methods
function handleLogout() {
  authStore.logout();
  router.push({ name: "Login" });
  window.location.reload();
}
</script>

<style lang="scss" scoped>
.vertical-nav-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  overflow-y: auto;
  background: var(--el-color-white);
  box-shadow: 0 0.125rem 0.5rem 0 rgba(47, 43, 61, 0.12);
  z-index: 1000;
  .el-menu-vertical {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .el-menu-vertical:not(.el-menu--collapse) {
    width: 250px;
    min-height: 400px;
  }
  .menu-account-row {
    margin-top: auto;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid var(--el-border-color);
    .menu-username {
      font-weight: 500;
      margin-right: 8px;
    }
    .account-dropdown {
      .dropdown-trigger {
        cursor: pointer;
        display: inline-flex;
        align-items: center;
      }
      .avatar {
        background-color: var(--el-color-primary);
        color: $white;
      }
    }
  }
}
</style>
