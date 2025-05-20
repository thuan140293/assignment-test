<template>
  <Drawer :model-value="modelValue" :title="title" @close="onCancel">
    <template #default>
      <el-form :model="formData" label-width="100px" :label-position="FormLabelPosition.LEFT">
        <el-form-item label="Name">
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="Username">
          <el-input v-model="formData.username" />
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="formData.email" />
        </el-form-item>
        <el-form-item label="Phone">
          <el-input v-model="formData.phone" type="tel" />
        </el-form-item>
        <el-form-item label="Website">
          <el-input v-model="formData.website" />
        </el-form-item>
        <el-form-item label="Company">
          <el-input v-model="formData.company.name" />
        </el-form-item>
        <el-form-item label="Address">
          <el-input v-model="formData.address.street" placeholder="Street" />
          <el-input
            v-model="formData.address.suite"
            placeholder="Suite"
            style="margin: 8px 0"
          />
          <el-input v-model="formData.address.city" placeholder="City" />
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <el-button @click="onCancel">Cancel</el-button>
      <el-button type="primary" :loading="loading" @click="onSubmit">
        {{ mode === "add" ? "Create" : "Save" }}
      </el-button>
    </template>
  </Drawer>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { UserListType, ModeTupleType } from "@/core/types";
import { FormLabelPosition } from "@/core/enums/commons";
import Drawer from "@/core/components/Drawer.vue";

// Props
interface Props {
  modelValue: boolean;
  mode: ModeTupleType;
  formData: UserListType;
  loading: boolean;
}
const props = defineProps<Props>();

// Emits
const emit = defineEmits(["update:modelValue", "cancel", "submit"]);

// Computed
const title = computed(() =>
  props.mode === "add" ? "Create New User" : "Edit User"
);

// Methods
function onCancel() {
  emit("update:modelValue", false);
  emit("cancel");
}

function onSubmit() {
  emit("submit");
}
</script>
