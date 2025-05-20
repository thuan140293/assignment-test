<template>
  <div>
    <UserToolbar
      :initialQuery="searchQuery"
      @search="handleSearch"
      @export="handleExport"
      @add="handleAdd"
    />
    <UserTable
      :data="filteredData"
      :loading="loading"
      :tableLayout="tableLayout"
      @detail="handleClickDetail"
      @edit="handleClickEdit"
      @delete="handleClickDelete"
    />
    <DetailDrawer
      :model-value="detailDrawerVisible"
      :loading="detailLoading"
      :user="detailUser"
      @update:modelValue="detailDrawerVisible = $event"
      @close="detailUser = null"
    />
    <UserFormDrawer
      :model-value="drawerVisible"
      :mode="drawerMode"
      :formData="formUser"
      :loading="upsertLoading"
      @update:modelValue="drawerVisible = $event"
      @cancel="drawerVisible = false"
      @submit="drawerMode === 'add' ? submitNewUser() : submitEditUser()"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, shallowRef } from "vue";
import { ElMessage, ElMessageBox, TableInstance } from "element-plus";
import {
  deleteUser,
  fetchUser,
  fetchUsers,
  newUser,
  updateUser,
} from "@/core/services/userService";
import type { AddressType, DrawerModeType, UserListType } from "@/core/types";
import { useMainStore } from "@/stores/main";

// Stores
const mainStore = useMainStore();

// Refs
const tableData = ref<UserListType[]>([]);
const searchQuery = shallowRef<string>("");
const loading = shallowRef<boolean>(false);
const tableLayout = ref<TableInstance["tableLayout"]>("fixed");

const detailDrawerVisible = shallowRef<boolean>(false);
const detailUser = ref<UserListType | null>(null);
const detailLoading = shallowRef<boolean>(false);

const drawerVisible = shallowRef<boolean>(false);
const drawerMode = shallowRef<DrawerModeType>("add");
const upsertLoading = shallowRef<boolean>(false);
const formUser = ref<UserListType>({
  id: 0,
  name: "",
  username: "",
  email: "",
  phone: 0,
  website: "",
  company: { name: "" },
  address: { street: "", suite: "", city: "" },
});

// Hooks
onMounted(async () => {
  mainStore.setPaddingZero(true);
  await onFetchUsers();
});

// Computed
const filteredData = computed(() => {
  if (!searchQuery.value) return tableData.value;
  return tableData.value.filter((u) =>
    u.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Methods
async function onFetchUsers() {
  loading.value = true;
  try {
    const users = await fetchUsers();
    tableData.value = users.map((u) => ({
      ...u,
      date: new Date().toISOString().slice(0, 10),
    }));
  } catch (err) {
    console.error("Fetch users failed", err);
  } finally {
    loading.value = false;
  }
}
function handleSearch(query: string) {
  searchQuery.value = query;
}

function handleExport(format: string) {
  console.log("Exporting as:", format);
  // TODO: implement actual export logic
}

function handleAdd() {
  drawerMode.value = "add";
  resetForm();
  drawerVisible.value = true;
}

function handleClickEdit(row: UserListType) {
  drawerMode.value = "edit";
  formUser.value = {
    id: row.id,
    name: row.name,
    username: row.username,
    email: row.email,
    phone: row.phone,
    website: row.website,
    company: {
      name: row.company?.name ?? "",
    },
    address: {
      street: row.address?.street ?? "",
      suite: row.address?.suite ?? "",
      city: row.address?.city ?? "",
    },
  };
  drawerVisible.value = true;
}

async function submitNewUser() {
  upsertLoading.value = true;
  try {
    const created = await newUser(formUser.value);
    tableData.value.unshift({
      ...created,
      date: new Date().toISOString().slice(0, 10),
    });
    ElMessage.success("User created!");
    drawerVisible.value = false;
  } catch (err) {
    ElMessage.error("Create user failed");
  } finally {
    upsertLoading.value = false;
  }
}

async function submitEditUser() {
  upsertLoading.value = true;
  try {
    const updated = await updateUser(String(formUser.value.id), formUser.value);
    const idx = tableData.value.findIndex((u) => u.id === updated.id);
    if (idx !== -1) {
      tableData.value[idx] = {
        ...updated,
        date: tableData.value[idx].date,
      };
    }
    ElMessage.success("User updated!");
    drawerVisible.value = false;
  } finally {
    upsertLoading.value = false;
  }
}

async function handleClickDetail(row: UserListType) {
  detailLoading.value = true;
  detailDrawerVisible.value = true;
  try {
    if (row.id === undefined || row.id === null) {
      throw new Error("User ID is undefined");
    }
    const userDetail = await fetchUser(row.id.toString());
    detailUser.value = userDetail;
  } catch (err) {
    console.error("Fetch user detail failed", err);
  } finally {
    detailLoading.value = false;
  }
}

async function handleClickDelete(row: UserListType) {
  try {
    await ElMessageBox.confirm(
      `Are you sure you want to delete user? "${row.name}"?`,
      "Confirm deletion",
      {
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        type: "warning",
      }
    );
    await deleteUser(String(row.id));
    tableData.value = tableData.value.filter((u) => u.id !== row.id);
    ElMessage.success("User deleted successfully!");
  } catch (err) {
    if (err === "cancel" || err === "close") {
    } else {
      console.error("Delete failed", err);
      ElMessage.error("Delete user failed");
    }
  }
}

function resetForm() {
  formUser.value = {
    name: "",
    username: "",
    email: "",
    phone: 0,
    website: "",
    company: { name: "" },
    address: { street: "", suite: "", city: "" },
  };
}
</script>

<style lang="scss" scoped>
.skeleton-wrapper {
  width: 100%;
  padding-left: 30px;
  padding-right: 30px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.bold-label {
  font-weight: bold;
}
</style>
