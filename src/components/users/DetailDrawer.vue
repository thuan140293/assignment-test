<template>
  <Drawer :model-value="modelValue" title="User Detail" @close="onClose">
    <template v-if="loading">
      <el-skeleton :rows="5" animated />
    </template>
    <template v-else-if="user">
      <el-descriptions :column="1">
        <el-descriptions-item label="Name">{{
          user.name
        }}</el-descriptions-item>
        <el-descriptions-item label="Username">{{
          user.username
        }}</el-descriptions-item>
        <el-descriptions-item label="Email">{{
          user.email
        }}</el-descriptions-item>
        <el-descriptions-item label="Phone">{{
          user.phone
        }}</el-descriptions-item>
        <el-descriptions-item label="Website">{{
          user.website
        }}</el-descriptions-item>
        <el-descriptions-item label="Company">{{
          user.company?.name
        }}</el-descriptions-item>
        <el-descriptions-item label="Address">{{
          formatAddress(user.address)
        }}</el-descriptions-item>
      </el-descriptions>
    </template>
    <template #footer>
      <el-button @click="onClose">Close</el-button>
    </template>
  </Drawer>
</template>

<script setup lang="ts">
import type { UserListType, AddressType } from "@/core/types";

// Props
interface Props {
  modelValue: boolean;
  loading: boolean;
  user: UserListType | null;
}
const props = defineProps<Props>();

// Emits
const emit = defineEmits(["update:modelValue", "close"]);

// Methods
function formatAddress(addr: AddressType | undefined) {
  if (!addr) return "";
  return `${addr.street} ${addr.suite} ${addr.city}`;
}

function onClose() {
  emit("update:modelValue", false);
  emit("close");
}
</script>
