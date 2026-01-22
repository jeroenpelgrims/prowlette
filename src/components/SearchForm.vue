<script setup lang="ts">
import { ref, watch } from "vue";
import FiltersSidepanel from "./filters/FiltersSidepanel.vue";
import Icon from "./Icon.vue";

const props = defineProps<{
  loading?: boolean;
}>();
const emit = defineEmits<{
  (e: "search", query: string, categories: number[]): void;
}>();

const query = ref<string>();
const categories = ref<number[]>([]);

const filtersSidepanelOpen = ref(false);

function submit(e: Event) {
  e.preventDefault();
  emit("search", query.value ?? "", categories.value);
}

watch(filtersSidepanelOpen, (newVal) => {
  if (!newVal) {
    submit(new Event("submit"));
  }
});
</script>

<template>
  <form @submit="submit" class="flex gap-1">
    <button
      class="btn btn-lg"
      type="button"
      @click="filtersSidepanelOpen = true"
    >
      <Icon name="filter_alt" />
      <div v-if="categories.length > 0" class="badge badge-sm">
        {{ categories.length }}
      </div>
    </button>

    <div class="join w-full grid grid-cols-[1fr_auto]">
      <label class="input input-lg join-item w-full">
        <Icon name="search" class="opacity-50 h-[1em]" />
        <input
          v-model="query"
          type="search"
          placeholder="Search"
          class="w-full"
        />
      </label>
      <button type="submit" class="btn btn-lg join-item">Search</button>
    </div>
  </form>
  <FiltersSidepanel
    v-model:open="filtersSidepanelOpen"
    v-model:selected-categories="categories"
  />
</template>
