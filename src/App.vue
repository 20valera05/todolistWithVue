<template>
  <div class="h-auto bg-gray-200 max-w-screen-lg mx-auto px-6 py-8">
    <h1 class="text-2xl font-bold text-center mb-12  text-gray-700">
      Task list
    </h1>
    <Message :submitedValue="submitedValue" :moveTask="moveTask" />
    <UncompletedTasks
      v-for="(task, index) in submitedValue"
      :key="index"
      :value="task"
      :taskId="index"
      @delete-task="handleDeleteTask"
      @is-move-task="handleMoveTask"
      @update-task="handleUpdateTask"
    />
    <Input />
    <Counter v-if="submitedValue.length !== 0 || moveTask.length !== 0" :moveTask="moveTask" :submitedValue="submitedValue" />
    <CompletedTasks
      v-for="(task, index) in moveTask"
      :key="index"
      :moveTask="task"
      :completeTaskId="index"
      @completed-move-task="handleCompletedMoveTask"
      @completed-delete-task="handleCompleteDeleteTask"
    />
  </div>
</template>
<script>
import { onMounted, provide, watch } from "vue";

import Input from "./components/Input.vue";
import UncompletedTasks from "./components/UncompletedTasks.vue";
import CompletedTasks from "./components/CompletedTasks.vue";
import Counter from "./components/Counter.vue";
import DeleteButton from "./components/buttons/DeleteButton.vue";
import Message from "./components/Message.vue";
import  useLocalStorage  from "./composables/localStorageFunction";


export default {
  components: {
    UncompletedTasks,
    Input,
    Counter,
    CompletedTasks,
    DeleteButton,
    Message,
  },
  setup() {
    const {
      submitedValue,
      moveTask,
      loadTasksFromLocalStorage,
      saveTasksToLocalStorage,
    } = useLocalStorage();

    provide("submitedValue", submitedValue);

    onMounted(() => {
      loadTasksFromLocalStorage();
    });

    watch(submitedValue, saveTasksToLocalStorage, { deep: true });
    watch(moveTask, saveTasksToLocalStorage, { deep: true });

    const handleDeleteTask = (taskId) => {
      submitedValue.value.splice(taskId, 1);
    };

    const handleCompleteDeleteTask = (completeTaskId) => {
      moveTask.value.splice(completeTaskId, 1);
    };

    const handleMoveTask = (taskId) => {
      const task = submitedValue.value[taskId];
      moveTask.value.unshift(task);
      handleDeleteTask(taskId);
    };

    const handleCompletedMoveTask = (completeTaskId) => {
      const task = moveTask.value[completeTaskId];
      submitedValue.value.push(task);
      handleCompleteDeleteTask(completeTaskId);
    };

    const handleUpdateTask = ({id, value}) =>{
      submitedValue.value[id] = value;
    }

    return {
      submitedValue,
      handleDeleteTask,
      handleMoveTask,
      moveTask,
      handleCompletedMoveTask,
      handleCompleteDeleteTask,
      handleUpdateTask
    };
  },
};
</script>

