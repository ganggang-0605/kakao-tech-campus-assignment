# ⚛️ React & Tailwind CSS Todo App

> **React의 컴포넌트 기반 아키텍처와 Tailwind CSS를 활용한 고도화된 캘린더형 Todo 웹 앱**
>
> 1차 과제(Vanilla JS)에서 구현한 기능적 요구사항을 React 환경으로 마이그레이션(Migration)하고, 상태 관리와 컴포넌트 분리를 통해 유지보수성과 생산성을 대폭 향상시킨 결과물

---

## ✨ 핵심 구현 사항 (Implementation Details)

### 1. 컴포넌트 기반 UI 아키텍처 (Component-Driven UI)
- **UI 모듈화**: `WeeklyView`, `DailyView`, `TodoInput`, `TodoFilter`, `TodoList`, `TodoItem`으로 기능을 캡슐화하여 코드 재사용성 확보
- **상태 주도 렌더링**: `useState`를 활용한 단일 진실 공급원(Single Source of Truth) 기반의 반응형 데이터 바인딩 적용

### 2. 고도화된 상태 관리 및 성능 최적화
- **효율적 데이터 동기화**: `useEffect`를 통한 로컬스토리지 자동 싱크 매커니즘 구현 및 `useState` 함수형 초기화로 리렌더링 시 오버헤드 최소화
- **사용자 경험 개선**: `prompt()` 대신 인라인 상태 제어를 통한 수정 UI 구현 및 입력값 검증을 통한 견고한 데이터 처리 로직 구축

### 3. 스타일링 및 렌더링 고도화 (Tailwind CSS v4)
- **전역 스타일링**: Tailwind v4 플러그인을 활용한 컴포넌트별 직관적인 스타일링 적용 및 반응형 레이아웃 구성
- **동적 필터링**: 필터링 상태(전체/진행/완료)에 따른 조건부 렌더링 최적화 수행

---

## 🎨 기술 스택 (Tech Stack)

| 구분 | 기술 요소 | 상세 활용 스택 |
| :--- | :--- | :--- |
| **Framework** | React v18+ | 함수형 컴포넌트, Hook(useState, useEffect, useRef) 기반 설계 |
| **Build Tool** | Vite v5.x | 고속 빌드 환경 및 플러그인 연동 |
| **Styling** | Tailwind CSS v4 | 유틸리티 퍼스트 디자인 기반 스타일 구성 |
| **Storage** | Web Storage API | 데이터 반영구적 보존 처리 |

---

## 📁 프로젝트 파일 구조 (File Structure)

```text
todo-react/
├── src/
│   ├── components/    # 컴포넌트 분리 관리
│   ├── utils/         # 날짜 유틸 함수 (getFormattedDate 등)
│   ├── App.jsx        # 최상위 상태 관리 중앙 통제실
│   └── index.css      # Tailwind 전역 스타일 선언
└── vite.config.js     # Tailwind 및 React 플러그인 연동 설정
