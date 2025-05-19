<template>
  <div>
    <!-- Toolbar -->
    <UserToolbar
      :initialQuery="searchQuery"
      @search="handleSearch"
      @export="handleExport"
      @add="handleAdd"
    />

    <!-- Skeleton + Table -->
    <el-skeleton
      :loading="loading"
      animated
      :rows="15"
      class="skeleton-wrapper"
    >
      <template #default>
        <el-table
          :data="filteredData"
          style="width: 100%"
          :table-layout="tableLayout"
        >
          <el-table-column type="selection" />
          <el-table-column label="Date">
            <template #default="scope">{{
              formatDate(scope.row.date, "dd/MM/yyyy")
            }}</template>
          </el-table-column>
          <el-table-column prop="name" label="Name" />
          <el-table-column prop="phone" label="Phone" />
          <el-table-column label="Address">
            <template #default="scope">
              {{ formatAddress(scope.row.address) }}
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="Operations">
            <template #default="scope">
              <el-button size="default" @click="handleClickDetail(scope.row)">
                <el-icon><View /></el-icon>
              </el-button>
              <el-button size="default" @click="handleClickEdit(scope.row)">
                <el-icon><EditPen /></el-icon>
              </el-button>
              <el-button
                type="danger"
                size="default"
                @click.prevent="handleClickDelete(scope.row)"
              >
                <el-icon><Delete /></el-icon>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-skeleton>

    <!-- Detail form -->
    <Drawer
      v-model="detailDrawerVisible"
      title="User Detail"
      @close="detailUser = null"
    >
      <template v-if="detailLoading">
        <el-skeleton :rows="5" animated />
      </template>
      <template v-else-if="detailUser">
        <el-descriptions title="Info" :column="1">
          <el-descriptions-item label="Name">{{
            detailUser?.name
          }}</el-descriptions-item>
          <el-descriptions-item label="Username">{{
            detailUser?.username
          }}</el-descriptions-item>
          <el-descriptions-item label="Email">{{
            detailUser?.email
          }}</el-descriptions-item>
          <el-descriptions-item label="Phone">{{
            detailUser?.phone
          }}</el-descriptions-item>
          <el-descriptions-item label="Website">{{
            detailUser?.website
          }}</el-descriptions-item>
          <el-descriptions-item label="Company">{{
            detailUser?.company?.name
          }}</el-descriptions-item>
          <el-descriptions-item label="Address">
            {{ formatAddress(detailUser?.address) }}
          </el-descriptions-item>
        </el-descriptions>
      </template>
      <template #footer>
        <el-button @click="detailDrawerVisible = false">Close</el-button>
      </template>
    </Drawer>

    <!-- Drawer for Add/Edit -->
    <Drawer
      v-model="drawerVisible"
      :title="drawerMode === 'add' ? 'Create New User' : 'Edit User'"
      @close="drawerVisible = false"
    >
      <template #default>
        <el-form :model="formUser" label-width="100px">
          <el-form-item label="Name">
            <el-input v-model="formUser.name" />
          </el-form-item>
          <el-form-item label="Username">
            <el-input v-model="formUser.username" />
          </el-form-item>
          <el-form-item label="Email">
            <el-input v-model="formUser.email" />
          </el-form-item>
          <el-form-item label="Phone">
            <el-input v-model="formUser.phone" type="tel" />
          </el-form-item>
          <el-form-item label="Website">
            <el-input v-model="formUser.website" />
          </el-form-item>
          <el-form-item label="Company">
            <el-input v-model="formUser.company.name" />
          </el-form-item>
          <el-form-item label="Address">
            <el-input v-model="formUser.address.street" placeholder="Street" />
            <el-input
              v-model="formUser.address.suite"
              placeholder="Suite"
              style="margin: 8px 0"
            />
            <el-input v-model="formUser.address.city" placeholder="City" />
          </el-form-item>
        </el-form>
      </template>

      <template #footer>
        <el-button @click="drawerVisible = false">Cancel</el-button>
        <el-button
          type="primary"
          v-if="drawerMode === 'add'"
          :loading="upsertLoading"
          @click="submitNewUser"
        >
          Create
        </el-button>
        <el-button
          type="primary"
          v-else
          :loading="upsertLoading"
          @click="submitEditUser"
        >
          Save
        </el-button>
      </template>
    </Drawer>
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
import type { AddressType, UserListType } from "@/core/types";
import { useMainStore } from "@/stores/main";
import { formatDate } from "@/core/utils/helper";

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
const drawerMode = shallowRef<"detail" | "add" | "edit">("add");
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

function formatAddress(addr: AddressType) {
  return `${addr.street} ${addr.suite} ${addr.city}`;
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
</style>
