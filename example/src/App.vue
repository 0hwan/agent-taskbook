<script setup>
import { useTasks } from './composables/useTasks'
import TaskInput from './components/TaskInput.vue'
import TaskList from './components/TaskList.vue'

const { tasks, add, toggle, remove, remaining } = useTasks([
  '가이드 문서 읽기',
  '핸드오프 스펙 작성',
])
</script>

<template>
  <main class="app">
    <h1>Taskbook</h1>
    <TaskInput @add="add" />
    <TaskList :tasks="tasks" @toggle="toggle" @remove="remove" />
    <footer class="status">남은 할 일 {{ remaining }}개</footer>
  </main>
</template>

<style scoped>
.app {
  max-width: 480px;
  margin: 48px auto;
  padding: 0 16px;
}
h1 {
  font-size: 22px;
  margin: 0 0 20px;
}
.status {
  margin-top: 16px;
  color: #888;
  font-size: 13px;
}
</style>
