import { useState, useEffect } from 'react';
import { getFormattedDate, getMonday } from './utils/dateUtils';
import WeeklyView from './components/WeeklyView';
import DailyView from './components/DailyView';
import TodoInput from './components/TodoInput';
import TodoFilter from './components/TodoFilter';
import TodoList from './components/TodoList';

function App() {
  // 로컬스토리지에서 초기값을 불러오는 함수형 초기화 적용 (렌더링 최적화)
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedDate, setSelectedDate] = useState(() => {
    return localStorage.getItem('selectedDate') || getFormattedDate(new Date());
  });

  const [weekStartDate, setWeekStartDate] = useState(() => {
    return localStorage.getItem('weekStartDate') || getFormattedDate(getMonday(new Date()));
  });

  const [filter, setFilter] = useState('all');

  // 상태 배열 및 날짜 데이터 변경 시 로컬스토리지 자동 동기화 처리
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('selectedDate', selectedDate);
    localStorage.setItem('weekStartDate', weekStartDate);
  }, [todos, selectedDate, weekStartDate]);

  // 일간 뷰 날짜 이동 시 주간 뷰의 기준 월요일도 자동 갱신되도록 연동
  useEffect(() => {
    const mondayOfSelected = getFormattedDate(getMonday(new Date(selectedDate)));
    if (mondayOfSelected !== weekStartDate) {
      setWeekStartDate(mondayOfSelected);
    }
  }, [selectedDate, weekStartDate]);

  // 신규 할 일 객체 생성 및 상태 배열에 추가
  const addTodo = (text) => {
    const newTodo = { id: Date.now(), text, isCompleted: false, date: selectedDate };
    setTodos([...todos, newTodo]);
  };

  // 고유 ID 대조를 통한 할 일 레코드 삭제 처리
  const deleteTodo = (id) => setTodos(todos.filter(t => t.id !== id));
  
  // 할 일 완료 여부 체크박스 상태 토글
  const toggleTodo = (id) => setTodos(todos.map(t => t.id === id ? { ...t, isCompleted: !t.isCompleted } : t));
  
  // 인라인 모드에서 전달받은 신규 텍스트로 내용 업데이트
  const updateTodo = (id, text) => setTodos(todos.map(t => t.id === id ? { ...t, text } : t));

  return (
    // 중앙 정렬 및 배경색 설정을 App 컴포넌트에서 직접 처리
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 h-fit">
        <h1 className="text-3xl font-extrabold text-center text-purple-600 mb-8">
          Todo List
        </h1>
        
        <WeeklyView 
          selectedDate={selectedDate} 
          setSelectedDate={setSelectedDate}
          weekStartDate={weekStartDate}
          setWeekStartDate={setWeekStartDate}
          todos={todos} 
        />
        
        <DailyView 
          selectedDate={selectedDate} 
          setSelectedDate={setSelectedDate} 
        />
        
        <TodoInput addTodo={addTodo} />
        <TodoFilter filter={filter} setFilter={setFilter} />
        <TodoList 
          todos={todos} 
          selectedDate={selectedDate} 
          filter={filter}
          onDelete={deleteTodo}
          onToggle={toggleTodo}
          onUpdate={updateTodo}
        />
      </div>
    </div>
  );
}

export default App;