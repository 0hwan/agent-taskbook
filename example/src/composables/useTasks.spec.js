import { describe, it, expect } from 'vitest'
import { useTasks } from './useTasks'

describe('useTasks', () => {
  it('초기 목록을 할 일 객체로 만든다', () => {
    const { tasks } = useTasks(['a', 'b'])
    expect(tasks.value).toHaveLength(2)
    expect(tasks.value[0]).toMatchObject({ title: 'a', done: false })
  })

  it('할 일을 추가한다', () => {
    const { tasks, add } = useTasks()
    add('새 할 일')
    expect(tasks.value.map((t) => t.title)).toEqual(['새 할 일'])
  })

  it('공백만 있는 입력은 추가하지 않는다', () => {
    const { tasks, add } = useTasks()
    add('   ')
    expect(tasks.value).toHaveLength(0)
  })

  it('완료 상태를 토글한다', () => {
    const { tasks, toggle } = useTasks(['a'])
    toggle(tasks.value[0].id)
    expect(tasks.value[0].done).toBe(true)
  })

  it('할 일을 삭제한다', () => {
    const { tasks, remove } = useTasks(['a', 'b'])
    remove(tasks.value[0].id)
    expect(tasks.value.map((t) => t.title)).toEqual(['b'])
  })

  it('remaining은 미완료 개수를 센다', () => {
    const { tasks, toggle, remaining } = useTasks(['a', 'b'])
    expect(remaining.value).toBe(2)
    toggle(tasks.value[0].id)
    expect(remaining.value).toBe(1)
  })
})
