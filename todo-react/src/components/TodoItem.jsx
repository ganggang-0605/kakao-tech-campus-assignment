import { useState, useRef, useEffect } from 'react';

function TodoItem({ todo, onDelete, onToggle, onUpdate }) {
  // 인라인 수정 모드 활성화 플래그 상태
  const [isEditing, setIsEditing] = useState(false);
  // 수정 필드 내 임시 텍스트 보관 상태
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef(null);

  // 수정 모드 진입 시 입력창에 즉각 포커스 할당
  useEffect(() => {
    if (isEditing && inputRef.current) inputRef.current.focus();
  }, [isEditing]);

  // 입력값 검증 후 부모 컴포넌트의 업데이트 핸들러 호출
  const handleUpdate = () => {
    if (!editText.trim()) {
      setEditText(todo.text);
    } else {
      onUpdate(todo.id, editText.trim());
    }
    setIsEditing(false);
  };

  return (
    <li className="flex flex-row items-center justify-between p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-row items-center gap-4 flex-1 overflow-hidden">
        <input 
          type="checkbox" 
          checked={todo.isCompleted}
          onChange={() => onToggle(todo.id)}
          className="w-5 h-5 accent-purple-600 cursor-pointer flex-shrink-0"
        />
        
        {/* 수정 모드 여부에 따른 인풋 태그와 스팬 태그 스위칭 렌더링 */}
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleUpdate}
            onKeyDown={(e) => e.key === 'Enter' && handleUpdate()}
            className="flex-1 px-2 py-1 border-b-2 border-purple-500 focus:outline-none"
          />
        ) : (
          <span className={`flex-1 truncate ${todo.isCompleted ? 'line-through text-gray-400' : 'text-gray-700 font-medium'}`}>
            {todo.text}
          </span>
        )}
      </div>

      <div className="flex flex-row gap-2 ml-4">
        {isEditing ? (
          <button onClick={handleUpdate} className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded-md font-bold">저장</button>
        ) : (
          <button onClick={() => setIsEditing(true)} className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200">수정</button>
        )}
        <button onClick={() => onDelete(todo.id)} className="px-3 py-1 text-sm bg-red-50 text-red-500 rounded-md hover:bg-red-100">삭제</button>
      </div>
    </li>
  );
}

export default TodoItem;