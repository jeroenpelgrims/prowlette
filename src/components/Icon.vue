<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{ name: string; type?: "outlined" | "rounded" | "sharp" }>(),
  { type: "outlined" },
);
const typeClass = computed(() => {
  return `material-symbols${props.type ? `-${props.type}` : ""}`;
});
</script>
<template>
  <span :class="typeClass">{{ name }}</span>
</template>
