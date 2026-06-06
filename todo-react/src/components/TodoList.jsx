import TodoItem from './TodoItem';

function TodoList({ todos, selectedDate, filter, onDelete, onToggle, onUpdate }) {
  // 현재 선택된 날짜와 활성 필터 옵션에 부합하는 항목만 필터링
  const filteredTodos = todos.filter(todo => {
    if (todo.date !== selectedDate) return false;
    if (filter === 'active') return !todo.isCompleted;
    if (filter === 'completed') return todo.isCompleted;
    return true;
  });

  return (
    <ul className="flex flex-col gap-3 min-h-[200px]">
      {/* 배열 길이에 따른 빈 상태 안내 문구 분기 처리 */}
      {filteredTodos.length === 0 ? (
        <div className="flex justify-center items-center h-full text-gray-400 text-sm mt-10">
          해당 조건의 할 일이 없습니다
        </div>
      ) : (
        filteredTodos.map(todo => (
          <TodoItem 
            key={todo.id} 
            todo={todo} 
            onDelete={onDelete}
            onToggle={onToggle}
            onUpdate={onUpdate}
          />
        ))
      )}
    </ul>
  );
}

export default TodoList;