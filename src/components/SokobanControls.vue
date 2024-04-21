<template>
  <div class="grid grid-cols-3 grow gap-4">
    <IconButton
      icon="i-heroicons-chevron-up"
      title="Up"
      class="col-start-2"
      @click="movePlayer('up')"
    />
    <IconButton
      icon="i-heroicons-chevron-left"
      title="Left"
      class="col-start-1"
      @click="movePlayer('left')"
    />
    <IconButton
      icon="i-heroicons-chevron-down"
      title="Down"
      @click="movePlayer('down')"
    />
    <IconButton
      icon="i-heroicons-chevron-right"
      title="Right"
      @click="movePlayer('right')"
    />
  </div>
</template>

<script lang="ts" setup>
import IconButton from "./IconButton.vue";

import { useSokoban } from "../composables/sokoban";

const { movePlayer } = useSokoban();
</script>
