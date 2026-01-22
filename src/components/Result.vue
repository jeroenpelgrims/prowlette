<script setup lang="ts">
import prettyBytes from "pretty-bytes";
import type { SearchResult } from "../api/useSearch";
import { getFavicon } from "../util/getFavicon";
import Icon from "./Icon.vue";

defineProps<{ result: SearchResult }>();
</script>
<template>
  <tr>
    <td>
      <div class="tooltip" :data-tip="result.indexer">
        <img :src="getFavicon(result.infoUrl)" class="min-w-6" />
      </div>
    </td>
    <td class="">
      <a :href="result.infoUrl" target="_blank" class="wrap-anywhere link">
        {{ result.title }}
      </a>
    </td>
    <td class="text-center text-green-600">{{ result.seeders }}</td>
    <td class="text-center text-red-600">{{ result.leechers }}</td>
    <td class="text-nowrap text-right">{{ prettyBytes(result.size) }}</td>
    <td class="text-center">
      <a v-if="result.downloadUrl" :href="result.downloadUrl">
        <Icon name="download" />
      </a>
      <a v-if="result.magnetUrl" :href="result.guid">
        <Icon name="format_underlined" />
      </a>
    </td>
  </tr>
</template>
