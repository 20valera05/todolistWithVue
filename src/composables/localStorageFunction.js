import { ref } from "vue";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const useFirestore = () => {
  const submitedValue = ref([]);
  const moveTask = ref([]);

  const db = getFirestore();
  const auth = getAuth();

  const loadTasksFromFirestore = async () => {
    const user = auth.currentUser;
    if (!user) {
      console.warn("User not authenticated");
      return
    }
    try {
      const docRef = doc(db, "tasks", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        submitedValue.value = data.submitedValue || [];
        moveTask.value = data.moveTask || []
      } else {
        console.log("No task data found for this user");
      }
    } catch (error) {
      console.error("Error loading tasks from firestore: ", error);
    }
  }

    const saveTasksToFirestore = async () => {
      const user = auth.currentUser;
      if (!user) {
        console.warn("User not authenticated");
        return
      }
      try{
        const docRef = doc(db, "tasks", user.uid);
        await setDoc(docRef,{
          submitedValue: submitedValue.value,
          moveTask: moveTask.value
        });
      } catch(error){
        console.error("Error saving tasks to firestore: ", error)
      }
    }

  return {
    submitedValue,
    moveTask,
    loadTasksFromFirestore,
    saveTasksToFirestore
  };
}

export default useFirestore