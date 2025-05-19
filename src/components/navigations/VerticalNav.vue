<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-vertical"
    router
    @open="handleOpen"
    @close="handleClose"
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
  </el-menu>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { User, Document } from "@element-plus/icons-vue";
import { MenuItemType } from "@/core/types";

// Constants
const menu: MenuItemType[] = [
  { index: "/posts", title: "Posts", icon: Document },
  {
    index: "/users",
    title: "Users",
    icon: User,
  },
];

// Composables
const route = useRoute();

// Computed
const activeIndex = computed(() => route.path);

// Methods
function handleOpen(index: string) {
  console.log("open:", index);
}
function handleClose(index: string) {
  console.log("close:", index);
}
</script>

<style lang="scss" scoped>
.el-menu-vertical:not(.el-menu--collapse) {
  width: 250px;
  height: 100%;
  min-height: 100vh;
  box-shadow: 0 0.125rem 0.5rem 0 rgba(47, 43, 61, 0.12);
}
</style>
