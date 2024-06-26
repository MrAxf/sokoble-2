<template>
  <section
    class="flex flex-col h-full gap-8"
  >
    <Board class="shrink-0 grow-0" />

    <SokobanControls class="grow shrink" />

    <div class="flex gap-8 text-xl font-bold grow-0 shrink-0 overflow-hidden">
      <span class="inline-flex">
        <Counter :count="moves" />
        <span>/{{ level.moves }}</span>
      </span>

      <span class="inline-flex">
        <Counter :count="pushes" />
        <span>/{{ level.pushes }}</span>
      </span>

      <span class="inline-flex">
        <Counter :count="score" />
      </span>
    </div>
  </section>
</template>

<script lang="ts" setup>
import Board from "./Board.vue";
import Counter from "./Counter.vue";
import SokobanControls from "./SokobanControls.vue";
import {
  createSokoban,
  useSokoban,
  useSokobanKeyControls,
} from "../composables/sokoban";
import { type Level } from "../types";

const props = defineProps<{
  level: Level;
}>();

createSokoban(props.level);
const { moves, pushes, score } = useSokoban();
useSokobanKeyControls();
</script>
