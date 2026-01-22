<script setup lang="ts">
defineProps<{ size: "xs" | "sm" | "md" | "lg" | "xl" }>();
</script>

<template>
  <span :class="`loading loading-spinner loading-${size}`" />
</template>
