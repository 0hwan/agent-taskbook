# 할 일 목록 필터 구현

## 목표
할 일이 쌓이면 목록이 길어져서 아직 안 끝난 게 뭔지 보기 어렵다.
사용자가 "전체 / 진행중 / 완료" 중 하나를 골라 목록을 걸러 볼 수 있게 한다.

## 배경 / 현재 동작
`example/` 은 Vue 3 + Vite 기반의 할 일 목록 앱이다. 상태는 Pinia 없이 composable 하나로 관리한다.

- `example/src/composables/useTasks.js`: 목록 상태(`tasks`)와 조작(`add`/`toggle`/`remove`), 미완료 개수(`remaining`)를 소유. 컴포넌트는 이 composable을 통해서만 목록을 바꾼다.
- `example/src/composables/useTasks.js:29`: `return { tasks, add, toggle, remove, remaining }` — 여기가 공개 인터페이스다.
- `example/src/App.vue:6`: `useTasks()` 를 호출해 상태를 받는다.
- `example/src/App.vue:16`: `<TaskList :tasks="tasks" />` — **전체 목록을 그대로** 넘기고 있다. 필터가 들어갈 지점.
- `example/src/components/TaskList.vue`: `tasks` prop을 받아 그리기만 한다. 필터링 로직 없음. 빈 배열이면 "할 일이 없습니다" 를 표시.

현재 필터 개념은 코드 어디에도 없다. 새로 만드는 것이다.

## 요구사항
1. 필터 상태는 `'all' | 'active' | 'done'` 세 가지. 기본값은 `'all'`.
2. `useTasks.js` 에 필터 상태와, 필터가 적용된 목록을 추가한다.
   - `filter`: 현재 선택된 필터 (ref)
   - `visibleTasks`: `filter` 에 따라 걸러진 목록 (computed)
     - `all` → 전체 / `active` → `done === false` / `done` → `done === true`
   - 둘 다 `useTasks()` 의 반환값에 포함시킬 것 (`example/src/composables/useTasks.js:29`)
3. 기존 `tasks` 는 **그대로 둔다.** 필터링된 목록은 `visibleTasks` 라는 별도 이름으로 낸다.
4. `remaining` 은 **필터와 무관하게 전체 기준 미완료 개수**를 유지한다.
   (완료 필터를 보는 중에도 "남은 할 일 2개" 가 그대로여야 한다. 필터는 보기 방식일 뿐 데이터가 아니다.)
5. 필터 UI는 새 컴포넌트 `example/src/components/TaskFilter.vue` 로 만든다.
   - 버튼 3개: `전체` / `진행중` / `완료`
   - 현재 선택된 버튼은 시각적으로 구분되게 (예: `active` 클래스)
   - 상태를 직접 바꾸지 말고 `App.vue` 로 이벤트를 올린다. 기존 컴포넌트들과 같은 방식(`defineEmits`)을 따를 것.
6. `App.vue` 는 `TaskFilter` 를 `TaskInput` 과 `TaskList` 사이에 두고,
   `TaskList` 에는 `tasks` 대신 `visibleTasks` 를 넘긴다.

## 수정 대상 파일
| 파일 | 할 일 |
|---|---|
| `example/src/composables/useTasks.js` | `filter` ref, `visibleTasks` computed 추가 후 반환값에 포함 |
| `example/src/components/TaskFilter.vue` | **신규.** 필터 버튼 3개, 선택 상태 표시, 이벤트 emit |
| `example/src/App.vue` | `TaskFilter` 배치, `TaskList` 에 `visibleTasks` 전달 |
| `example/src/composables/useTasks.spec.js` | `visibleTasks` / `remaining` 테스트 추가 |

## 제약 조건
- 새 의존성 추가 금지. 라우터도 상태관리 라이브러리도 쓰지 말 것 — `ref`/`computed` 로 충분하다.
- `useTasks()` 의 기존 반환값(`tasks`, `add`, `toggle`, `remove`, `remaining`)의 이름과 동작을 바꾸지 말 것. **추가만 한다.**
- 컴포넌트는 `<script setup>` 을 쓴다. 스타일은 `scoped`. 주변 컴포넌트의 작성 방식을 따를 것.
- 필터링은 `useTasks.js` 에서 한다. `TaskList.vue` 는 받은 목록을 그리기만 하는 현재 역할을 유지한다.

## 하지 말 것
- `TaskItem.vue`, `TaskInput.vue` 수정 (이번 작업과 무관하다)
- 요청 범위 밖 리팩터링
- 관련 없는 파일 포맷팅 변경
- 필터 상태를 localStorage에 저장하는 등 스펙에 없는 기능 추가

## 완료 기준
- [ ] `cd example && npm test` 통과 (기존 6개 테스트 포함 전부)
- [ ] `useTasks.spec.js` 에 아래 테스트가 추가됨
  - [ ] `filter` 기본값이 `'all'` 이고 `visibleTasks` 가 전체를 반환
  - [ ] `filter = 'active'` 일 때 미완료만 반환
  - [ ] `filter = 'done'` 일 때 완료만 반환
  - [ ] 필터가 `'done'` 이어도 `remaining` 은 전체 기준 미완료 개수
- [ ] 수동 검증: `cd example && npm run dev` → 브라우저에서
  - [ ] 초기 상태에서 `전체` 가 선택되어 있고 할 일 2개가 보인다
  - [ ] 하나를 체크한 뒤 `진행중` 을 누르면 체크 안 된 것만 남는다
  - [ ] `완료` 를 누르면 체크한 것만 보이고, 하단 "남은 할 일 1개" 는 변하지 않는다
  - [ ] `완료` 필터에서 아무것도 없으면 "할 일이 없습니다" 가 보인다

## 참고
- 비슷한 패턴: `example/src/composables/useTasks.js:27` 의 `remaining` — `tasks` 로부터 파생된 `computed` 를 만들어 반환하는 방식. `visibleTasks` 도 같은 모양이다.
- 이벤트 emit 패턴: `example/src/components/TaskInput.vue` (`defineEmits(['add'])` → `emit('add', ...)`)
- prop + emit 릴레이 패턴: `example/src/components/TaskList.vue`
