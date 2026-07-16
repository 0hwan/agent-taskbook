<script setup>
import TaskItem from './TaskItem.vue'

defineProps({
  tasks: { type: Array, required: true },
})
defineEmits(['toggle', 'remove'])
</script>

<template>
  <p v-if="tasks.length === 0" class="empty">할 일이 없습니다.</p>
  <ul v-else class="task-list">
    <TaskItem
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @toggle="$emit('toggle', $event)"
      @remove="$emit('remove', $event)"
    />
  </ul>
</template>

<style scoped>
.task-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.empty {
  color: #999;
  text-align: center;
  padding: 24px 0;
  font-size: 14px;
}
</style>
