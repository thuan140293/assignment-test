<template>
  <el-skeleton :loading="loading" animated :rows="15" class="skeleton-wrapper">
    <template #default>
      <el-table :data="data" :table-layout="tableLayout">
        <el-table-column type="selection" />
        <el-table-column label="Date" width="150">
          <template #default="{ row }">{{
            formatDate(row.date, "dd/MM/yyyy")
          }}</template>
        </el-table-column>
        <el-table-column prop="name" label="Name" width="200" sortable />
        <el-table-column prop="phone" label="Phone" width="200" sortable />
        <el-table-column label="Address" :width="addressWidth">
          <template #default="{ row }">{{
            formatAddress(row.address)
          }}</template>
        </el-table-column>
        <el-table-column fixed="right" label="Actions" width="200">
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
import { shallowRef, watch } from "vue";
import type { TableInstance } from "element-plus";
import { formatDate } from "@/core/utils/helper";
import type { AddressType, UserListType } from "@/core/types";
import { useMediaQuery } from "@/composables/useMediaQuery";
import { MediaScreen } from "@/core/enums/commons";

// Props
interface Props {
  data: UserListType[];
  loading: boolean;
  tableLayout: TableInstance["tableLayout"];
}
defineProps<Props>();

// Emits
const emit = defineEmits(["detail", "edit", "delete"]);

// Composables
const { matches: isLargeDesktop } = useMediaQuery(
  `(min-width: ${MediaScreen.DESKTOP})`
);

// Refs
const addressWidth = shallowRef<number | undefined>(undefined);

// watch
watch(
  isLargeDesktop,
  (newVal) => {
    if (!newVal) {
      addressWidth.value = 350;
    } else {
      addressWidth.value = undefined;
    }
  },
  { immediate: true }
);

// Methods
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
