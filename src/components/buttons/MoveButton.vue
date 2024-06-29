<template>
  <a
    @click="submitClick"
    class="inline-block  min-w-6 min-h-6 rounded-full border cursor-pointer"
  ></a>
</template>

<script>
import { computed } from "vue";
export default {
  props: ["task", "completedTask"],
  setup(props, { emit }) {
    const moveTask = computed(() => {
      return props.task;
    });

    const completedMoveTask = computed(() => {
      return props.completedTask;
    });

    const submitClick = () => {
      if (moveTask.value) {
        emit("is-move-task", moveTask.value);
      }
      if (completedMoveTask.value) {
        emit("completed-move-task", completedMoveTask.value);
      }
    };

    return { submitClick, moveTask, completedMoveTask };
  },
};
</script>

