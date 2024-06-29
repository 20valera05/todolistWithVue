<template>
  <div
    v-if="submitedValue.length === 0 && moveTask.length === 0"
    class="flex justify-center">
    <span class="text-xl font-bold text-gray-500">You don't have tasks to do.</span>
  </div>
  <div
    v-if="submitedValue.length === 0 && moveTask.length != 0"
    class="flex items-center flex-col"
  >
    <span v-html="doneMessage"></span>
    <span class="text-xl font-bold text-gray-500">All Done! </span>
  </div>
</template>

<script>
import { computed } from "vue";
export default {
  props: ["submitedValue", "moveTask"],
  setup(props) {
    const doneMessage = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>`;

    const submitedValue = computed(() => {
      return props.submitedValue;
    });

    const moveTask = computed(() => {
      return props.moveTask;
    });

    return { submitedValue, moveTask, doneMessage };
  },
};
</script>

<style>
</style>