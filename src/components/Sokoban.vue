<template>
  <section class="flex flex-col h-[calc(100vh-13rem)] justify-between gap-4">
    <Board class="grow" />
    <SokobanControls class="" />
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
