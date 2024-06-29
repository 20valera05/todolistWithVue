<template>
  <div class="flex items-center" v-if="task">
    <MoveButton @is-move-task="handleIsMoveTask" :task="task" class=" border-green-500 hover:bg-green-200"/>
    <span class="w-full pl-6 text-lg py-3" >{{ task }}</span>
    <DeleteButton @delete-task="deleteTask" :taskId="taskId" :task="task" />
  </div>
</template>

<script>
import { computed } from "vue";
import DeleteButton from "./buttons/DeleteButton.vue";
import MoveButton from "./buttons/MoveButton.vue";
import Modal from './buttons/Modal.vue';
export default {
  components: { MoveButton, DeleteButton, Modal },
  props: ["value", "taskId"],
  setup(props, { emit }) {
    const task = computed(() =>  props.value );
    
    const deleteTask = () => {
      emit("delete-task", props.taskId);
    };

    const handleIsMoveTask = () =>{
      emit("is-move-task", props.taskId)
    }
   
    return { task, deleteTask, handleIsMoveTask };
  },
};
</script>

