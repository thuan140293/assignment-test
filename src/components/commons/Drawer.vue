<template>
  <el-drawer
    :title="title"
    v-model="visibleValue"
    :size="size"
    :placement="placement"
    :with-header="withHeader"
    @close="onClose"
  >
    <!-- Body slot -->
    <slot />
    <!-- Footer slot -->
    <template #footer>
      <slot name="footer" />
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { computed } from "vue";

// Props
const props = defineProps({
  modelValue: { type: Boolean, required: true },
  title: { type: String, default: "" },
  size: { type: String, default: "30%" },
  placement: { type: String, default: "right" },
  withHeader: { type: Boolean, default: true },
});

// Emits
const emit = defineEmits<{
  (e: "update:modelValue", v: boolean): void;
  (e: "close"): void;
}>();

// Computed
const visibleValue = computed({
  get: () => props.modelValue,
  set: (v: boolean) => emit("update:modelValue", v),
});

// Methods
function onClose() {
  emit("update:modelValue", false);
  emit("close");
}
</script>
