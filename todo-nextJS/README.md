# 풀스택 Todo 앱

Next.js(App Router)와 FastAPI를 연동한 일정 관리 어플리케이션

## ✨ 주요 기능
- **기본 CRUD**: 할 일 추가, 조회, 수정, 삭제
- **일정 관리**: react-calendar를 활용해 날짜별 할 일 개수 뱃지 표시
- **서버 기반 필터 & 검색 (도전 미션 완료)**: URL Search Params를 활용하여 FastAPI 서버 단에서 텍스트 검색 및 완료 여부 필터링 동시 적용
- **UI/UX**: 애플 스타일의 모던한 UI 적용 및 빈 화면(Empty State) 예외 처리

## 🛠️ 실행 방법
1. 백엔드 (FastAPI)
   ```bash
   cd backend
   source .venv/bin/activate
   uvicorn main:app --reload
   ```

2. 프론트엔드 (Next.js)
   ```bash
   cd frontend
   npm run dev
   ```