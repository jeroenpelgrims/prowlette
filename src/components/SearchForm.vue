<script setup lang="ts">
import { ref } from "vue";
import FiltersSidepanel from "./FiltersSidepanel.vue";
import Icon from "./Icon.vue";

const props = defineProps<{
  loading?: boolean;
}>();
defineModel<string>("query");
const emit = defineEmits<{
  (e: "submit", query: string): void;
}>();

const filtersSidepanelOpen = ref(false);

function submit(e: Event) {
  e.preventDefault();
  const target = e.currentTarget as HTMLFormElement;
  const input = target.querySelector("input")!;
  emit("submit", input.value);
}
</script>

<template>
  <form @submit="submit" class="flex gap-1">
    <!-- <Sidepanel>
      <template #button="{ for: id }">
        <label :for="id" class="btn btn-lg">
          <Icon name="filter_alt" />
        </label>
      </template>
      <Filters />
    </Sidepanel> -->
    <button
      class="btn btn-lg"
      type="button"
      @click="filtersSidepanelOpen = true"
    >
      <Icon name="filter_alt" />
    </button>

    <div class="join w-full grid grid-cols-[1fr_auto]">
      <label class="input input-lg join-item w-full">
        <Icon name="search" class="opacity-50 h-[1em]" />
        <input type="search" placeholder="Search" class="w-full" />
      </label>
      <button type="submit" class="btn btn-lg join-item">Search</button>
    </div>
  </form>
  <FiltersSidepanel v-model:open="filtersSidepanelOpen" />
</template>
