<script setup lang="ts">
import type { SearchResult } from "../api/useSearch";
import type { SortBy } from "../util/table";
import Icon from "./Icon.vue";

defineProps<{
  column: keyof SearchResult;
  sort: SortBy | undefined;
}>();
defineEmits<{
  (e: "sort"): void;
}>();
</script>
<template>
  <th class="cursor-pointer" @click="$emit('sort')">
    <div class="flex items-center">
      <span class="capitalize">
        {{ column }}
      </span>
      <Icon v-if="sort?.column === column" :name="sort?.direction === 'asc' ? 'arrow_drop_up' : 'arrow_drop_down'" />
    </div>
  </th>
</template>
