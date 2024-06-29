<template>
  <teleport to=".moduls" v-if="showModal">
    <Modal
      @delete-task="deleteTask"
      @completed-delete-task="CompletedDeleteTask"
      @close="showModal = false"
      :taskId="taskId"
      :completeTaskId="completeTaskId"
      :showModal="showModal"
      :task="task"
      :completedTasks="completedTasks"
    />
  </teleport>
  <button
    v-html="buttonContent"
    class="w-6 h-6 border border-red-300 bg-gray-300 rounded-sm"
    @click="handleDelete"
  ></button>
</template>

<script>
import { computed, ref } from "vue";
import Modal from "./Modal.vue";
export default {
  components: { Modal },
  props: ["taskId", "completeTaskId", "task", "completedTasks"],
  setup(props, { emit }) {
    const showModal = ref(false);
    const buttonContent = `<svg class ="w-4 h-4 pl-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
    stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round"
        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>`;

    const task = computed(() =>{
      return props.task;
    });

    const completedTasks = computed(() =>{
      return props.completedTasks;
    })

    const taskId = computed(() => {
      return props.taskId;
    });
    const completeTaskId = computed(() => {
      return props.completeTaskId;
    });

    const handleDelete = () => {
      showModal.value = true;
    };

    const deleteTask = () => {
      emit("delete-task", taskId.value);
    };

    const CompletedDeleteTask = () => {
      emit("completed-delete-task", completeTaskId.value);
    };

    return {
      buttonContent,
      handleDelete,
      showModal,
      taskId,
      completeTaskId,
      deleteTask,
      CompletedDeleteTask,
      task,
      completedTasks
    };
  },
};
</script>

<style>
</style>