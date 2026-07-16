<script setup>
defineProps({
  task: { type: Object, required: true },
})
defineEmits(['toggle', 'remove'])
</script>

<template>
  <li class="task-item" :class="{ done: task.done }">
    <label>
      <input type="checkbox" :checked="task.done" @change="$emit('toggle', task.id)" />
      <span>{{ task.title }}</span>
    </label>
    <button class="remove" aria-label="삭제" @click="$emit('remove', task.id)">×</button>
  </li>
</template>

<style scoped>
.task-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 4px;
  border-bottom: 1px solid #eee;
}
.task-item label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}
.task-item.done span {
  text-decoration: line-through;
  color: #999;
}
.remove {
  border: 0;
  background: none;
  color: #bbb;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
}
.remove:hover {
  color: #e04747;
}
</style>
