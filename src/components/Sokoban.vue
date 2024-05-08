<template>
  <section class="flex flex-col h-[calc(100vh-11rem)] md:h-[calc(100vh-13rem)] gap-4">
    <Board class="grow" />
    <div class="flex gap-8 text-xl font-bold">
      <span class="inline-flex">
        <Counter :count="moves" />
        <span>/{{ level.moves }}</span>
      </span>

      <span class="inline-flex">
        <Counter :count="pushes" />
        <span>/{{ level.pushes }}</span>
      </span>
    </div>
    <SokobanControls class="" />
  </section>
</template>

<script lang="ts" setup>
import Board from "./Board.vue";
import Counter from "./Counter.vue";
import SokobanControls from "./SokobanControls.vue";
import { createSokoban, useSokoban, useSokobanKeyControls } from "../composables/sokoban";
import { type Level } from "../types";

const props = defineProps<{
  level: Level;
}>();

createSokoban(props.level);
const { moves, pushes } = useSokoban();
useSokobanKeyControls();
</script>
