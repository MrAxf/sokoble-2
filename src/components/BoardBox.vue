<template>
  <g ref="target" :style="initialStyle">
    <rect
      width="1"
      height="1"
      rx="0.3"
      ry="0.3"
      :class="[
        'transition-colors',
        props.isOnButton
          ? 'fill-success'
          : 'fill-box',
      ]"
    ></rect>
    <rect
      width="0.5"
      height="0.5"
      rx="0.15"
      ry="0.15"
      x="0.25"
      y="0.25"
      :class="[
        'transition-colors',
        props.isOnButton
          ? 'fill-success-clear'
          : 'fill-box-clear',
      ]"
    ></rect>
  </g>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useEntity } from "../composables/useEntity";
import type { Point } from "../types";

const props = defineProps<
  Point & {
    isOnButton: boolean;
  }
>();

const { target, initialStyle } = useEntity(computed(() => props));
</script>
