<script setup lang="ts">
import type { IndexerCategory } from "../../api/useCategories";

defineProps<{
  category: IndexerCategory;
  selected: number[];
}>();
defineEmits<{
  (e: "toggle", category: IndexerCategory): void;
}>();
</script>
<template>
  <div>
    <input
      type="checkbox"
      :id="`category-${category.id}`"
      class="checkbox checkbox-sm mr-2"
      :checked="selected.includes(category.id)"
      @change="$emit('toggle', category)"
    />
    <label :for="`category-${category.id}`" class="cursor-pointer">
      {{ category.name }}
    </label>

    <div v-if="category.subCategories" class="ml-4">
      <Category
        v-for="subCategory in category.subCategories"
        :key="subCategory.id"
        :category="subCategory"
        @toggle="$emit('toggle', $event)"
        :selected="selected"
      />
    </div>
  </div>
</template>
