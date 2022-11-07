<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Task } from "./Task";

const tasks = ref<Task[]>([
  { id: 1, title: "Setup", completed: true },
  { id: 2, title: "Entities", completed: false },
  { id: 3, title: "Paging, Sorting and Filtering", completed: false },
  { id: 4, title: "CRUD Operations", completed: false },
  { id: 5, title: "Validation", completed: false },
  { id: 6, title: "Backend methods", completed: false },
  { id: 7, title: "Database", completed: false },
  { id: 8, title: "Authentication and Authorization", completed: false },
  { id: 9, title: "Deployment", completed: false },
]);

const newTaskTitle = ref("");

async function addTask() {
  if (newTaskTitle.value) {
    tasks.value = [
      ...tasks.value,
      {
        title: newTaskTitle.value,
        completed: false,
        id: tasks.value.length + 1,
      },
    ];
  }
}
async function deleteTask(task: Task) {
  tasks.value = tasks.value.filter((t) => t != task);
}
async function setAllCompleted(completed: boolean) {
  tasks.value = tasks.value.map((t) => ({ ...t, completed }));
}
</script>

<template>
  <div>
    <main>
      <input
        v-model="newTaskTitle"
        placeholder="What needs to be done?"
        v-on:blur="addTask"
        @keydown.enter="addTask"
      />
      <div v-for="task in tasks">
        <input type="checkbox" v-model="task.completed" />
        <input v-model="task.title" />
        <button @click="deleteTask(task)">x</button>
      </div>
    </main>
    <div>
      <button @click="setAllCompleted(true)">Set all as completed</button>
      <button @click="setAllCompleted(false)">Set all as uncompleted</button>
    </div>
  </div>
</template>
