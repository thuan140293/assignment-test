<template>
  <el-skeleton :loading="loading" animated :rows="15" class="skeleton-wrapper">
    <template #default>
      <el-table :data="data" :table-layout="tableLayout">
        <el-table-column type="selection" />
        <el-table-column label="Date">
          <template #default="{ row }">{{
            formatDate(row.date, "dd/MM/yyyy")
          }}</template>
        </el-table-column>
        <el-table-column prop="name" label="Name" />
        <el-table-column prop="phone" label="Phone" />
        <el-table-column label="Address">
          <template #default="{ row }">{{
            formatAddress(row.address)
          }}</template>
        </el-table-column>
        <el-table-column fixed="right" label="Operations">
          <template #default="{ row }">
            <el-button size="default" @click="$emit('detail', row)">
              <el-icon><View /></el-icon>
            </el-button>
            <el-button size="default" @click="$emit('edit', row)">
              <el-icon><EditPen /></el-icon>
            </el-button>
            <el-button
              type="danger"
              size="default"
              @click.prevent="$emit('delete', row)"
            >
              <el-icon><Delete /></el-icon>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </el-skeleton>
</template>

<script setup lang="ts">
import type { TableInstance } from "element-plus";
import { formatDate } from "@/core/utils/helper";
import type { AddressType, UserListType } from "@/core/types";

// Props
interface Props {
  data: UserListType[];
  loading: boolean;
  tableLayout: TableInstance["tableLayout"];
}
const props = defineProps<Props>();

// Emits
const emit = defineEmits(["detail", "edit", "delete"]);

function formatAddress(addr: AddressType) {
  return `${addr.street} ${addr.suite} ${addr.city}`;
}
</script>

<style scoped lang="scss">
.skeleton-wrapper {
  width: 100%;
  padding: 0 30px;
  margin: 15px 0;
}
</style>
