import { useState } from 'react';

function TodoInput({ addTodo }) {
  const [text, setText] = useState('');

  // 폼 제출 이벤트 가로채기 및 빈 값 유효성 검증
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return alert('할 일을 입력해주세요!');
    addTodo(text.trim());
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-row gap-2 mb-6 w-full">
      <input 
        type="text" 
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="새로운 할 일을 입력하세요"
        className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
      />
      <button 
        type="submit"
        className="px-6 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-colors whitespace-nowrap"
      >
        추가
      </button>
    </form>
  );
}

export default TodoInput;