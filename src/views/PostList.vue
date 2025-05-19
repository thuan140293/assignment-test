<template>
  <!-- Skeleton + Table -->
  <el-skeleton :loading="loading" animated :rows="15" class="skeleton-wrapper">
    <template #default>
      <el-table
        :data="tableData"
        :table-layout="tableLayout"
      >
        <el-table-column prop="title" label="Title" />
        <el-table-column prop="body" label="Body" />
        <el-table-column label="Author" fixed="right">
          <template #default="scope">
            {{ scope.row.authorName }}
          </template>
        </el-table-column>
      </el-table>
    </template>
  </el-skeleton>
</template>

<script setup lang="ts">
import { ref, onMounted, shallowRef } from "vue";
import { TableInstance } from "element-plus";
import { fetchPosts } from "@/core/services/postService";
import { fetchUsers } from "@/core/services/userService";
import { PostListType, UserListType } from "@/core/types";
import { useMainStore } from "@/stores/main";

// Stores
const mainStore = useMainStore();

// Refs
const loading = shallowRef<boolean>(false);
const tableData = ref<PostListType[]>([]);
const tableLayout = ref<TableInstance["tableLayout"]>("fixed");
const userData = ref<UserListType[]>([]);

// Hooks
onMounted(async () => {
  mainStore.setPaddingZero(false);
  await onFetchPosts();
});

// Methods
async function onFetchPosts() {
  loading.value = true;
  try {
    const [posts, users] = await Promise.all([fetchPosts(), fetchUsers()]);
    userData.value = users;

    tableData.value = posts.map((post) => {
      const author = users.find((u) => u.id === post.userId);
      return {
        ...post,
        authorName: author?.name || "Unknown",
      };
    });
  } catch (err) {
    console.error("Failed to fetch data", err);
  } finally {
    loading.value = false;
  }
}
</script>
