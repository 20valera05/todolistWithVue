<template>
  <div class="mt-5 ml-12 pr-5">
    <input
      ref="myInput"
      @keydown.enter="submitInput"
      type="text"
      placeholder="New task"
      v-model="taskInput"
      class="w-full bg-gray-200 border-b border-dashed border-gray-400 text-gray-500 text-xl px-1 focus:outline-none focus:border-solid focus:border-gray-500 focus:text-gray-500 focus:text-xl"
    />
  </div>
</template>

<script>
import { inject, onMounted, ref } from "vue";
export default {
  setup() {
    const taskInput = ref("");
    const submitedValue = inject("submitedValue", ref([]));
    const myInput = ref(null);
    
    const submitInput = () => {
      if (taskInput.value.trim() != "") {
        submitedValue.value.push(taskInput.value);
      }
      taskInput.value = "";
    };

    onMounted(() => {
      myInput.value.focus();
    });

    return { taskInput, submitedValue, submitInput, myInput };
  },
};
</script>

