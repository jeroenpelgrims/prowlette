<script setup lang="ts">
import Sidepanel from "./sidepanel/Sidepanel.vue";

const open = defineModel<boolean>("open", { required: true });
</script>

<template>
  <Sidepanel v-model:open="open">
    Filters go here Filters go here Filters go here Filters go here Filters go
    here Filters go here Filters go here
  </Sidepanel>
</template>
