<template>
  <div class="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"></div>
  <div
    class="z-50 absolute top-1/4 left-1/3 flex justify-center items-center border-2 border-gray-300">
    <div class="bg-gray-50 py-7 px-8">
      <p v-if="task" class="text-lg mb-4">Are you sure you want to delete task "{{task}}"?</p>
      <p v-if="completedTasks" class="text-lg mb-4">Are you sure you want to delete task "<span class="line-through">{{completedTasks}}</span>"?</p>
      <div class="flex justify-center">
        <button @click="handleDelete" class="bg-gray-200 border border-gray-300 px-3 py-1 mr-4">
          Yes
        </button>
        <button
          @click="$emit('close')" class="bg-gray-200 border border-gray-300 px-3 py-1">
          No
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
export default {
  props: ["taskId", "completeTaskId", "task", "completedTasks"],
  setup(props, { emit }) {
    const task = computed(() =>{
        return props.task;
    });
    
    const completedTasks = computed(() =>{
        return props.completedTasks;
    });
    
    const handleDelete = () => {
      emit("delete-task", props.taskId);
      emit("completed-delete-task", props.completeTaskId);
      emit("close");
    };

    return { handleDelete, task, completedTasks };
  },
};
</script>

<style>
</style>