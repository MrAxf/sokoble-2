<template>
  <g>
    <rect
      :x="props.x"
      :y="props.y"
      width="1"
      height="1"
      class="fill-background-alt stroke-background-alt stroke-[0.1]"
    />
    <circle
      :cx="props.x + 0.5"
      :cy="props.y + 0.5"
      r="0.25"
      class="fill-success-clear"
    />
  </g>
</template>

<script lang="ts" setup>
import type { Point } from "../types";

const props = defineProps<Point>();
</script>
