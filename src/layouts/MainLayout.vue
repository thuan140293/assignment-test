<template>
  <div class="common-layout">
    <el-container>
        <el-container>
          <el-aside>
            <slot name="aside"></slot>
          </el-aside>
          <el-main>
            <el-card :class="cardClass">
              <slot name="main"></slot>
            </el-card>
          </el-main>
        </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useMainStore } from '@/stores/main';

// Stores
const mainStore = useMainStore();

// Computed
const cardClass = computed(() => ({
  'p-0': mainStore.isPaddingZero,
}));
</script>

<style scope lang="scss">
.el-card {
  &.p-0 {
    .el-card__body {
      padding: 0;
    }
  }
}
</style>