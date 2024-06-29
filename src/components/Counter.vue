<template>
  <div class="flex items-center space-x-2 mt-5">
    <hr class="bg-gray-300 h-0.5 w-full" />
    <div class="flex space-x-1 text-sm">
      <span>{{ moveTaskCount }}</span>
      /
      <span>{{ totalSummary }}</span>
      (
      <span :class="addClass">{{ percentageRatio }}%</span>
      <span>done)</span>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
export default {
  props: ["moveTask", "submitedValue"],
  setup(props) {
    const totalSummary = computed(() => {
      return props.submitedValue.length + props.moveTask.length;
    });

    const moveTaskCount = computed(() => {
      return props.moveTask.length;
    });

    const percentageRatio = computed(() => {
      if (totalSummary.value === 0) {
        return 0;
      }
      return parseInt((moveTaskCount.value / totalSummary.value) * 100);
    });

    const addClass = computed(() => {
      return {
        "text-red-600": percentageRatio.value > 0 && percentageRatio.value < 50,
        "text-orange-400": percentageRatio.value >= 50 && percentageRatio.value < 100,
        "text-green-500": percentageRatio.value === 100,
      };
    });

    return {
      totalSummary,
      moveTaskCount,
      percentageRatio,
      addClass,
    };
  },
};
</script>


