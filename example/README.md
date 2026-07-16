# Taskbook 예제

[GUIDE.md](../GUIDE.md) 의 협업 방식을 한 바퀴 돌아보기 위한 최소 Vue 3 앱.

## 실행

```bash
cd example
npm install
npm run dev     # http://localhost:5173
npm test        # vitest
```

## 구조

```
src/
├── App.vue                     # 화면 조립 + 상태 배선
├── composables/
│   ├── useTasks.js             # 상태와 조작을 전부 소유
│   └── useTasks.spec.js
└── components/
    ├── TaskInput.vue           # 입력 → emit('add')
    ├── TaskList.vue            # 목록 렌더링 (로직 없음)
    └── TaskItem.vue            # 항목 하나 → emit('toggle'|'remove')
```

**설계 의도**: 상태는 `useTasks.js` 한 곳에만 있고, 컴포넌트는 받아서 그리고 이벤트를 올릴 뿐이다.
이 경계가 있어야 스펙에서 "이 파일만 고쳐라"라고 **닫힌 집합**을 지정할 수 있다.
로직이 컴포넌트마다 흩어져 있으면 수정 범위를 못 닫고, 구현자가 어디까지 손대야 할지 추측하게 된다.

## 이 예제가 보여주는 것

현재 코드는 **베이스라인**이다. 여기에 필터 기능을 얹는 게 다음 작업이고,
그 스펙이 [prompts/2026-07-16-task-filter.md](../prompts/2026-07-16-task-filter.md) 에 있다.

그 문서를 Open Code에 넘겨서 구현시키는 것이 [WORKFLOW.md](../WORKFLOW.md) 3단계다.
