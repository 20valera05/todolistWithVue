<template>
    <div class="h-auto bg-gray-200 max-w-screen-lg mx-auto px-6 py-8 relative">
      <h1 class="text-2xl font-bold text-center mb-12  text-gray-700">
        Task list
      </h1>
      <button @click="signOutMethod" class="absolute top-1 right-3 font-medium text-lg text-gray-700 hover:underline">Logout</button>
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
  
  import Input from "../components/Input.vue";
  import UncompletedTasks from "../components/UncompletedTasks.vue";
  import CompletedTasks from "../components/CompletedTasks.vue";
  import Counter from "../components/Counter.vue";
  import DeleteButton from "../components/buttons/DeleteButton.vue";
  import Message from "../components/Message.vue";
  import useFirestore  from "../composables/localStorageFunction";
  import { getAuth, signOut } from "firebase/auth";
  import { useRouter } from "vue-router";
 
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

      const router = useRouter();

      const {
        submitedValue,
        moveTask,
        loadTasksFromFirestore,
        saveTasksToFirestore,
      } = useFirestore();
  
      provide("submitedValue", submitedValue);

      onMounted(() => {
        loadTasksFromFirestore();
      });
  
      watch(submitedValue, saveTasksToFirestore, { deep: true });
      watch(moveTask, saveTasksToFirestore, { deep: true });
  
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

      const signOutMethod = async() =>{
        await signOut(getAuth())
        router.push('/')
      }


  
      return {
        submitedValue,
        handleDeleteTask,
        handleMoveTask,
        moveTask,
        handleCompletedMoveTask,
        handleCompleteDeleteTask,
        handleUpdateTask,
        signOutMethod
      };
    },
  };
  </script>
  