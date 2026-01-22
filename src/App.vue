<script setup lang="ts">
import { computed, ref } from "vue";
import { useSearch, type SearchResult } from "./api/useSearch";
import Loader from "./components/Loader.vue";
import ResultsTable from "./components/ResultsTable.vue";
import SearchForm from "./components/SearchForm.vue";
import type { SortBy } from "./util/table";

const query = ref<string>();
const categories = ref<number[]>([]);
const sort = ref<SortBy>();
const results = useSearch({ query, categories });

const sortedResults = computed<SearchResult[]>(() => {
  const data = results.data.value ?? [];
  if (!sort.value) {
    return data;
  }
  const { column, direction } = sort.value;
  return data.toSorted((a, b) => {
    const left = (a[column] ?? 0) as number;
    const right = (b[column] ?? 0) as number;
    return direction === "asc" ? left - right : right - left;
  });
});

function updateSorting(by: keyof SearchResult) {
  if (sort.value?.column !== by) {
    sort.value = { column: by, direction: "desc" };
  } else {
    sort.value = {
      column: by,
      direction: sort.value?.direction === "asc" ? "desc" : "asc",
    };
  }
}

function doSearch(newQuery: string, newCategories: number[]) {
  query.value = newQuery;
  categories.value = newCategories;
  sort.value = { column: "seeders", direction: "desc" };
}
</script>

<template>
  <SearchForm
    class="m-4"
    :loading="results.isLoading.value"
    v-model:categories="categories"
    @search="doSearch"
  />
  <template v-if="!results.isEnabled.value" />
  <div
    v-else-if="results.isLoading.value"
    class="w-full flex justify-center my-4"
  >
    <Loader size="xs" />
  </div>
  <ResultsTable
    v-else
    :results="sortedResults"
    :sort="sort"
    @sort="updateSorting($event)"
  />
</template>
