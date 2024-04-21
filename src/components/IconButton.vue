<template>
  <button
    class="bg-player hover:bg-player-clear active:bg-player-dark dark rounded-lg transition-colors"
    @click="
      (e) => {
        emit('click', e);
      }
    "
  >
    <i :class="[props.icon, 'size-16 px-2 py-4']" /> 
  </button>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    icon: string;
    title: string;
    disabled?: boolean;
  }>(),
  {
    disabled: false,
  }
);

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();
</script>
