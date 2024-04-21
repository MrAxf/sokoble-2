<template>
  <section class="flex flex-col h-[70vh] gap-4">
    <Board />
    <SokobanControls class="grow " />
  </section>
</template>

<script lang="ts" setup>
import Board from "./Board.vue";
import SokobanControls from "./SokobanControls.vue";
import { createSokoban, useSokobanKeyControls } from "../composables/sokoban";
import { type Level } from "../types";

const props = defineProps<{
  level: Level;
}>();

createSokoban(props.level);
useSokobanKeyControls();
</script>
