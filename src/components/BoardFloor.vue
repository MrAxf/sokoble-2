<template>
  <rect
    :x="props.x"
    :y="props.y"
    width="1"
    height="1"
    class="fill-background stroke-background stroke-[0.1]"
  />
</template>

<script lang="ts" setup>
import type { Point } from '../types';

const props = defineProps<Point>();
</script>
