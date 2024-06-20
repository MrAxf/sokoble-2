<template>
  <div class="grid grid-cols-3 gap-4">
    <IconButton
      icon="i-heroicons-backward"
      title="Undo"
      @click="undo()"
    />
    <IconButton
      icon="i-heroicons-chevron-up"
      title="Up"
      @click="movePlayer('up')"
    />
    <IconButton
      icon="i-heroicons-arrow-path"
      title="Restart"
      @click="restart()"
    />
    <IconButton
      icon="i-heroicons-chevron-left"
      title="Left"
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

const { movePlayer, undo, restart } = useSokoban();
</script>
