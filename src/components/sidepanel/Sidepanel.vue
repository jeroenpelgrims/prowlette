<script setup lang="ts">
defineProps<{
  side?: "left" | "right";
}>();
const open = defineModel<boolean>("open", { required: true });
</script>

<template>
  <Teleport to="body">
    <div class="drawer" :class="{ 'drawer-end': side === 'right' }">
      <input
        :checked="open"
        type="checkbox"
        class="drawer-toggle"
        @change="open = ($event.target as HTMLInputElement).checked"
      />

      <div class="drawer-side z-50">
        <label class="drawer-overlay" @click="open = false" />
        <div
          class="menu bg-base-200 text-base-content min-h-full min-w-80 max-w-1/2 p-4"
        >
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>
