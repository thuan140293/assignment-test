<template>
  <el-skeleton :loading="loading" animated :rows="20" class="skeleton-wrapper">
    <template #default>
      <el-row :gutter="20" class="card-grid">
        <el-col
          v-for="item in tableData"
          :key="item.id"
          :xs="24"
          :sm="12"
          :md="8"
          :lg="6"
        >
          <el-card shadow="hover" class="post-card">
            <div class="card-inner">
              <div class="card-header">
                <span class="title">{{ item.title }}</span>
              </div>
              <div class="card-body">
                <p>{{ item.body }}</p>
              </div>
              <div class="card-footer">
                <el-avatar size="small" icon="el-icon-user" />
                <span class="author">{{ item.authorName }}</span>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </template>
  </el-skeleton>
</template>

<script setup lang="ts">
import { ref, onMounted, shallowRef } from "vue";
import { fetchPosts } from "@/core/services/postService";
import { fetchUsers } from "@/core/services/userService";
import { useMainStore } from "@/stores/main";
import type { PostListType } from "@/core/types";

// Stores
const mainStore = useMainStore();

// Refs
const loading = shallowRef<boolean>(false);
const tableData = ref<PostListType[]>([]);

// Hooks
onMounted(async () => {
  mainStore.setPaddingZero(false);
  await loadData();
});

// Methods
async function loadData() {
  loading.value = true;
  try {
    const [posts, users] = await Promise.all([fetchPosts(), fetchUsers()]);
    tableData.value = posts.map((post) => {
      const author = users.find((u) => u.id === post.userId);
      return { ...post, authorName: author?.name ?? "Unknown" };
    });
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
}
</script>

<style lang="scss" scoped>
.skeleton-wrapper {
  width: 100%;
}

.card-grid {
  margin-top: 20px;

  .el-col {
    margin-bottom: 20px;

    .post-card {
      height: 100%;
      display: flex;
      flex-direction: column;

      .card-inner {
        display: flex;
        flex-direction: column;
        flex: 1;

        .card-header {
          .title {
            font-weight: bold;
            font-size: 16px;
            display: block;
            margin-bottom: 8px;
          }
        }

        .card-body {
          flex: 1;
          font-size: 14px;
          margin-bottom: 12px;
        }

        .card-footer {
          display: flex;
          align-items: center;
          font-size: 13px;
          color: $lavender-gray;
          margin-top: auto;

          .author {
            margin-left: 8px;
          }
        }
      }
    }
  }
}
</style>
