<template>
  <div class="auth-container">
    <el-card class="auth-card" shadow="hover">
      <h2 class="auth-title">Login</h2>
      <el-form
        ref="loginForm"
        :model="form"
        :rules="loginFormRules"
        :label-position="FormLabelPosition.TOP"
      >
        <el-form-item label="Username" prop="username">
          <el-input v-model="form.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input
            v-model="form.password"
            type="password"
            show-password
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" :loading="loading" class="auth-btn">
            Login
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef } from "vue";
import { ElMessage } from "element-plus";
import type { FormInstance } from "element-plus";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import type { LoginFormType } from "@/core/types";
import { FormLabelPosition } from "@/core/enums/commons";
import { loginFormRules } from "@/core/constants";

// Stores
const authStore = useAuthStore();

// Composables
const router = useRouter();

// Refs
const loginForm = ref<FormInstance>();
const loading = shallowRef<boolean>(false);
const form = ref<LoginFormType>({ username: "", password: "" });

// Methods
async function onSubmit() {
  await loginForm.value?.validate(async (valid) => {
    if (!valid) return;
    loading.value = true;
    try {
      await authStore.login(form.value);
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
  .auth-card {
    width: 360px;
    padding: 30px;
  }
  .auth-title {
    text-align: center;
    margin-bottom: 20px;
  }
}
</style>
