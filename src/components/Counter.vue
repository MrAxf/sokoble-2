<template>
  <div class="w-[2.4em] h-[1.5em] relative">
    <TransitionGroup
      enter-active-class="transition-all ease-out"
      enter-from-class="opacity-0 -translate-y-[1em]"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-[1em]"
    >
      <span
        v-for="(number, idx) in strArrCount"
        :key="`${number}-${idx}`"
        class="absolute w-[0.6em] h-[1.5em] text-center [font-size:var(--font-size)]"
        :style="{ left: `calc(${idx}em * 0.6)` }"
      >
        {{ number }}
      </span>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, onUnmounted, computed } from "vue";

const props = defineProps<{
  count: number;
}>();

const strArrCount = computed(() => Array.from(props.count.toString()));
</script>
