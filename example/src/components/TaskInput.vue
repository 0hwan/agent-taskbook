<script setup>
import { ref } from 'vue'

const emit = defineEmits(['add'])
const draft = ref('')

function submit() {
  emit('add', draft.value)
  draft.value = ''
}
</script>

<template>
  <form class="task-input" @submit.prevent="submit">
    <input v-model="draft" placeholder="할 일을 입력하세요" aria-label="할 일 입력" />
    <button type="submit">추가</button>
  </form>
</template>

<style scoped>
.task-input {
  display: flex;
  gap: 8px;
}
.task-input input {
  flex: 1;
  padding: 8px 10px;
  border: 1px solid #d0d0d0;
  border-radius: 6px;
  font-size: 14px;
}
.task-input button {
  padding: 8px 16px;
  border: 0;
  border-radius: 6px;
  background: #2c6bed;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
}
</style>
