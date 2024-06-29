<template>
    <div v-if="task" class="flex items-center">
      <MoveButton @completed-move-task="handleIsMoveTask" :completedTask="task" class="bg-green-400 border-green-600"/>
      <span class="w-full pl-6 text-lg py-3 line-through">{{ task }}</span>
      <DeleteButton @completed-delete-task="deleteTask" :completeTaskId="completeTaskId" :completedTasks="task"/>
    </div>
</template>

<script>
import { computed } from "vue";
import DeleteButton from "./buttons/DeleteButton.vue";
import MoveButton from "./buttons/MoveButton.vue";
import Modal from './buttons/Modal.vue';


export default {
  components: { DeleteButton, MoveButton, Modal },
  props: ["moveTask", "completeTaskId"],
  setup(props, {emit}) {
    const task = computed(() => props.moveTask);
    
    const deleteTask = () =>{
      emit("completed-delete-task", props.completeTaskId)
    }

    const handleIsMoveTask = () =>{
      emit("completed-move-task", props.completeTaskId)
    }

    return {  task, handleIsMoveTask, deleteTask };
  },
};
</script>


