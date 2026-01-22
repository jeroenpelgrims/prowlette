<script setup lang="ts">
withDefaults(defineProps<{ size?: "xs" | "sm" | "md" | "lg" | "xl" }>(), {
  size: "md",
});
</script>

<template>
  <span :class="`loading loading-spinner loading-${size}`" />
</template>
