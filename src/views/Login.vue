<template>
  <div class="auth-container">
    <el-card class="auth-card" shadow="hover">
      <h2 class="auth-title">Login</h2>
      <el-form
        ref="loginForm"
        :model="form"
        :rules="rules"
        label-position="top"
      >
        <el-form-item label="Username" prop="username">
          <el-input v-model="form.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input
            v-model="form.password"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" :loading="loading">
            Login
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import type { FormInstance } from "element-plus";
import type { LoginFormType } from "@/core/type";

// Stores
const authStore = useAuthStore();

// Composables
const router = useRouter();

// Refs
const loginForm = ref<FormInstance>();
const loading = ref<boolean>(false);
const form = ref<LoginFormType>({ username: "", password: "" });

// Constanst
const rules = {
  username: [
    { required: true, message: "Please enter username", trigger: "blur" },
  ],
  password: [
    { required: true, message: "Please enter password", trigger: "blur" },
  ],
};

// Methods
async function onSubmit() {
  await loginForm.value?.validate(async (valid) => {
    if (!valid) return;
    loading.value = true;
    try {
      await authStore.login(form.value.username, form.value.password);
      ElMessage.success("Login successful!");
      router.push({ name: "UserList" });
    } catch (err) {
      ElMessage.error("Invalid credentials");
    } finally {
      loading.value = false;
    }
  });
}
</script>

<style scoped lang="scss">
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 40px);
}
.auth-card {
  width: 360px;
  padding: 30px;
}
.auth-title {
  text-align: center;
  margin-bottom: 20px;
}
</style>
