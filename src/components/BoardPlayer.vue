<template>
  <circle ref="target" r="0.45" class="fill-player" :style="initialStyle" />
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useEntity } from "../composables/useEntity";
import type { Point } from "../types";

const props = defineProps<Point>();

const { target, initialStyle } = useEntity(
  computed(() => props),
  0.5
);
</script>
