<script setup lang="ts">
import { useCategories, type IndexerCategory } from "../../api/useCategories";
import Loader from "../Loader.vue";
import Sidepanel from "../sidepanel/Sidepanel.vue";
import Category from "./Category.vue";

const open = defineModel<boolean>("open", { required: true });
const categories = useCategories();
const selectedCategories = defineModel<number[]>("selectedCategories", {
  required: true,
});

function getSubIds(category: IndexerCategory): number[] {
  let subIds = category.subCategories.flatMap(getSubIds);
  return [category.id, ...subIds];
}

function toggleCategory(category: IndexerCategory, force?: boolean) {
  let toggleTo = force ?? !selectedCategories.value.includes(category.id);
  const idWithSubIds = getSubIds(category);
  console.log(idWithSubIds);

  const without = selectedCategories.value.filter(
    (id) => !idWithSubIds.includes(id),
  );
  const newSelection = [...without, ...(toggleTo ? idWithSubIds : [])];

  selectedCategories.value = newSelection;
}
</script>

<template>
  <Sidepanel v-model:open="open">
    <div class="flex flex-col">
      <Loader v-if="categories.isLoading.value" />
      <Category
        v-else
        v-for="category in categories.data.value ?? []"
        :key="category.id"
        :category="category"
        :selected="selectedCategories"
        @toggle="toggleCategory"
      />
    </div>
  </Sidepanel>
</template>
