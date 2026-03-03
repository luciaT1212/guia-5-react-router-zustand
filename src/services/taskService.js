import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

const TASKS_COLLECTION = "tasks";

export const subscribeToTasks = (userId, callback) => {
  const q = query(collection(db, TASKS_COLLECTION), where("userId", "==", userId));

  return onSnapshot(q, (snapshot) => {
    const tasks = snapshot.docs
      .map((taskDoc) => {
        const data = taskDoc.data();

        return {
          id: taskDoc.id,
          ...data,
          createdAt: data.createdAt?.toDate?.() ?? null,
          dueDate: data.dueDate?.toDate?.() ?? null,
        };
      })
      .sort((firstTask, secondTask) => {
        const firstTime = firstTask.createdAt?.getTime?.() ?? 0;
        const secondTime = secondTask.createdAt?.getTime?.() ?? 0;
        return secondTime - firstTime;
      });

    callback(tasks);
  });
};

export const createTask = async (userId, taskData) => {
  try {
    const docRef = await addDoc(collection(db, TASKS_COLLECTION), {
      ...taskData,
      userId,
      completed: false,
      createdAt: serverTimestamp(),
    });

    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error creating task:", error);
    return { success: false, error: error.message };
  }
};

export const updateTask = async (taskId, updates) => {
  try {
    const taskRef = doc(db, TASKS_COLLECTION, taskId);
    await updateDoc(taskRef, updates);
    return { success: true };
  } catch (error) {
    console.error("Error updating task:", error);
    return { success: false, error: error.message };
  }
};

export const deleteTask = async (taskId) => {
  try {
    await deleteDoc(doc(db, TASKS_COLLECTION, taskId));
    return { success: true };
  } catch (error) {
    console.error("Error deleting task:", error);
    return { success: false, error: error.message };
  }
};

export const getTaskById = async (taskId) => {
  try {
    const taskDoc = await getDoc(doc(db, TASKS_COLLECTION, taskId));

    if (!taskDoc.exists()) {
      return { success: false, error: "Tarea no encontrada" };
    }

    const data = taskDoc.data();

    return {
      success: true,
      task: {
        id: taskDoc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.() ?? null,
        dueDate: data.dueDate?.toDate?.() ?? null,
      },
    };
  } catch (error) {
    console.error("Error fetching task:", error);
    return { success: false, error: error.message };
  }
};
