import { ref, computed } from 'vue'

let nextId = 1

/**
 * 할 일 목록 상태와 조작을 담당한다.
 * 컴포넌트는 이 composable을 통해서만 목록을 바꾼다.
 */
export function useTasks(initial = []) {
  const tasks = ref(initial.map((title) => ({ id: nextId++, title, done: false })))

  function add(title) {
    const trimmed = title.trim()
    if (!trimmed) return
    tasks.value.push({ id: nextId++, title: trimmed, done: false })
  }

  function toggle(id) {
    const task = tasks.value.find((t) => t.id === id)
    if (task) task.done = !task.done
  }

  function remove(id) {
    tasks.value = tasks.value.filter((t) => t.id !== id)
  }

  const remaining = computed(() => tasks.value.filter((t) => !t.done).length)

  return { tasks, add, toggle, remove, remaining }
}
