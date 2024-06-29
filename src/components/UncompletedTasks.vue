<template>
  <div class="flex items-center" v-if="task">
    <MoveButton
      @is-move-task="handleIsMoveTask"
      :task="task"
      class="border-green-500 hover:bg-green-200"
    />
    <span
      v-if="!inputFlag"
      @click="handleInput"
      class="w-full pl-6 text-lg py-3"
      >{{ task }}</span
    >
    <input
      ref="inputFocus"
      v-model="changeTask"
      v-if="inputFlag"
      @blur="handleBlur"
      @keydown.enter="submitChangeTask"
      type="text"
      class="border bg-gray-200 w-[99%] rounded text-lg  mr-2 ml-6 my-3 border-none"
    />
    <DeleteButton @delete-task="deleteTask" :taskId="taskId" :task="task" />
  </div>
</template>

<script>
import { ref, watch, nextTick } from "vue";
import DeleteButton from "./buttons/DeleteButton.vue";
import MoveButton from "./buttons/MoveButton.vue";
import Modal from "./buttons/Modal.vue";
export default {
  components: { MoveButton, DeleteButton, Modal },
  props: ["value", "taskId"],
  setup(props, { emit }) {
    const task = ref(props.value);
    const inputFlag = ref(false);
    const inputFocus = ref(null);
    const changeTask = ref(task.value);

    const deleteTask = () => {
      emit("delete-task", props.taskId);
    };

    const handleIsMoveTask = () => {
      emit("is-move-task", props.taskId);
    };

    const handleInput = () => {
      inputFlag.value = true;
      nextTick(() => {
        inputFocus.value.focus();
      });
    };

    const handleBlur = () => {
      inputFlag.value = false;
      task.value = changeTask.value;
      emit("update-task", { id: props.taskId, value: changeTask.value });
    };

    const submitChangeTask = () => {
      inputFlag.value = false;
      task.value = changeTask.value;
      emit("update-task", { id: props.taskId, value: changeTask.value });
    };

    watch(() => props.value,(newTask) => {
        task.value = newTask;
        changeTask.value = newTask;
      }
    );

    return {
      task,
      deleteTask,
      handleIsMoveTask,
      handleInput,
      handleBlur,
      inputFlag,
      inputFocus,
      changeTask,
      submitChangeTask,
    };
  },
};
</script>

