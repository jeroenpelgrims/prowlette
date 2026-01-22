<script setup lang="ts">
import type { SearchResult } from "../api/useSearch";
import type { SortBy } from "../util/table";
import Result from "./Result.vue";
import ResultsTableHeader from "./ResultsTableHeader.vue";

defineProps<{
  results: SearchResult[];
  sort: SortBy | undefined;
}>();
const emit = defineEmits<{
  (e: "sort", by: keyof SearchResult): void;
}>();
</script>
<template>
  <div v-if="results.length === 0">No results found</div>
  <div v-else class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
    <table class="table table-xs">
      <!-- head -->
      <thead>
        <tr>
          <th />
          <ResultsTableHeader column="title" :sort="sort" @sort="emit('sort', 'sortTitle')" />
          <ResultsTableHeader column="seeders" :sort="sort" @sort="emit('sort', 'seeders')" />
          <ResultsTableHeader column="leechers" :sort="sort" @sort="emit('sort', 'leechers')" />
          <ResultsTableHeader column="size" :sort="sort" @sort="emit('sort', 'size')" />
          <th>Download</th>
        </tr>
      </thead>
      <tbody>
        <Result v-for="result in results" :key="result.id" :result="result" />
      </tbody>
    </table>
  </div>
</template>
