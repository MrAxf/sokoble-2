import { type ComputedRef, ref, watchEffect, onMounted, type StyleValue } from "vue";
import { animate, spring, type ElementOrSelector } from "motion";
import type { Point } from "../types";

export function useEntity(postion: ComputedRef<Point>, offset: number = 0) {
  const target = ref<SVGElement | null>(null);

  const initialStyle: StyleValue = {
    transform: "translateX(var(--motion-translateX)) translateY(var(--motion-translateY))",
    "--motion-translateX": `${ postion.value.x + offset }px`,
    "--motion-translateY": `${ postion.value.y + offset }px`,
  };

  const isAnimating = ref(false);

  onMounted(() => {
    watchEffect(() => {
      isAnimating.value = true;
      animate(
        target.value as ElementOrSelector,
        {
          x: postion.value.x + offset,
          y: postion.value.y + offset,
        },
        {
          easing: spring({
            stiffness: 150,
            damping: 13,
          }),
        }
      );
    });
  });

  return {
    target,
    initialStyle,
  };
}
