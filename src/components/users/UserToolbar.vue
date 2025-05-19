<template>
  <div class="toolbar">
    <!-- Search Input -->
    <el-input
      v-model="searchQuery"
      placeholder="Search by name"
      clearable
      class="search-input"
      @input="onSearch"
    />

    <!-- Action Buttons -->
    <div class="actions">
      <el-dropdown>
        <el-button>
          Export <el-icon class="el-icon--right"><ArrowDown /></el-icon
        ></el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click.native="onExport('Print')"
              >Print</el-dropdown-item
            >
            <el-dropdown-item @click.native="onExport('Csv')"
              >Csv</el-dropdown-item
            >
            <el-dropdown-item @click.native="onExport('Excel')"
              >Excel</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-button type="primary" @click="onAdd">Add New Record</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { shallowRef, watch } from "vue";

// Props
interface Props {
  initialQuery?: string;
}
const props = defineProps<Props>();

// Emits
const emit = defineEmits<{
  (e: "search", query: string): void;
  (e: "export", format: string): void;
  (e: "add"): void;
}>();

// Refs
const searchQuery = shallowRef<string>(props.initialQuery || "");

// Watch
watch(searchQuery, (val, old) => {
  if (val !== old) onSearch();
});

// Methods
const onSearch = () => emit("search", searchQuery.value);
const onExport = (format: string) => emit("export", format);
const onAdd = () => emit("add");
</script>

<style scoped lang="scss">
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 30px;
  border-bottom: 1px solid $light-gray;
  .search-input {
    width: 30%;
  }
  .actions {
    display: flex;
    align-items: center;
    gap: 10px;
  }
}
</style>
