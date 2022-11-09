<script setup lang="ts">
import { remult } from "remult";
import { onMounted, onUnmounted, ref } from "vue";
import { Task } from "../shared/Task";

const tasks = ref<Task[]>([]);

const taskRepo = remult.repo(Task);

onMounted(async () => 
  onUnmounted( taskRepo.query({
  }).subscribe(reduce => {
    tasks.value = reduce(tasks.value);
  })
  
))

const newTaskTitle = ref("");

async function addTask() {
  if (newTaskTitle.value) {
    tasks.value = [
      ...tasks.value,
      await taskRepo.insert({
        title: newTaskTitle.value,
        completed: false,
        id: tasks.value.length + 1,
      })
    ];
  }
}
async function deleteTask(task: Task) {
  await taskRepo.delete(task);
  tasks.value = tasks.value.filter((t) => t != task);
}
async function setAllCompleted(completed: boolean) {
  for (const task of tasks.value) {
    await taskRepo.save({ ...task, completed });
  }
  tasks.value = await taskRepo.find();
}
async function save(task: Task) {
  try {
    await taskRepo.save(task);
  } catch (error: any) {
    alert(error.message);
  }
}
</script>

<template>
  <div>
    <main>
      <input v-model="newTaskTitle" placeholder="What needs to be done?" @keydown.enter="addTask" />
      <div v-for="task in tasks">
        <input type="checkbox" v-model="task.completed" @change="save(task)" />
        <input v-model="task.title" @blur="save(task)" />
        <button @click="deleteTask(task)">x</button>
      </div>
    </main>
    <div>
      <button @click="setAllCompleted(true)">Set all as completed</button>
      <button @click="setAllCompleted(false)">Set all as uncompleted</button>
    </div>
  </div>
</template>
