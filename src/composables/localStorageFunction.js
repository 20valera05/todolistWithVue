import { ref } from "vue";

const useLocalStorage = () => {
  const submitedValue = ref([]);
  const moveTask = ref([]);

  const loadTasksFromLocalStorage = () => {
    const storedSubmitedValue = localStorage.getItem('submitedValue');
    const storedMoveTask = localStorage.getItem('moveTask');
    if (storedSubmitedValue) {
      submitedValue.value = JSON.parse(storedSubmitedValue);
    }
    if (storedMoveTask) {
      moveTask.value = JSON.parse(storedMoveTask);
    }
  };

  const saveTasksToLocalStorage = () => {
    localStorage.setItem('submitedValue', JSON.stringify(submitedValue.value));
    localStorage.setItem('moveTask', JSON.stringify(moveTask.value));
  };

  return {
    submitedValue,
    moveTask,
    loadTasksFromLocalStorage,
    saveTasksToLocalStorage,
  };
}

export default useLocalStorage