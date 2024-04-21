<template>
  <figure
    class="aspect-square h-auto max-h-[50vh] w-auto mx-auto bg-gradient-to-br from-player to-success rounded-xl"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :viewBox="`0 0 ${level.width} ${level.height}`"
      class="w-full h-full"
    >
      <g>
        <template v-for="tile in tiles" :key="`${tile.x}-${tile.y}`">
          <BoardFloor v-if="!tile.isButton" :x="tile.x" :y="tile.y" />
          <BoardButton v-else :x="tile.x" :y="tile.y" />
        </template>
      </g>
      <g>
        <template v-for="(box, idx) in boxes" :key="idx">
          <BoardBox :x="box.x" :y="box.y" :isOnButton="box.isOnButton" />
        </template>
      </g>
      <BoardPlayer :x="player.x" :y="player.y" />
    </svg>
  </figure>
</template>

<script lang="ts" setup>
import BoardFloor from "./BoardFloor.vue";
import BoardButton from "./BoardButton.vue";
import BoardBox from "./BoardBox.vue";
import BoardPlayer from "./BoardPlayer.vue";
import { useSokoban } from "../composables/sokoban";

const { level, tiles, boxes, player } = useSokoban();
</script>
