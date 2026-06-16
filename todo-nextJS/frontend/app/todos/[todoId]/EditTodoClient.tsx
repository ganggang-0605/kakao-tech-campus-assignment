'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function EditTodoClient({ todo }: { todo: any }) {
  const [text, setText] = useState(todo.text);
  const [completed, setCompleted] = useState(todo.completed);
  const router = useRouter();

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    await fetch(`/api/todos/${todo.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text, completed }) });
    router.push('/todos');
    router.refresh();
  };

  const handleDelete = async () => {
    if (!confirm('삭제하시겠습니까?')) return;
    await fetch(`/api/todos/${todo.id}`, { method: 'DELETE' });
    router.push('/todos');
    router.refresh();
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 border rounded-xl bg-white">
      <h1 className="text-2xl font-bold mb-6">할 일 수정</h1>
      <form onSubmit={handleUpdate} className="flex flex-col gap-5">
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} className="border p-3 rounded-lg" />
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={completed} onChange={(e) => setCompleted(e.target.checked)} className="w-5 h-5" /> 완료 처리하기
        </label>
        <div className="flex gap-2 mt-4">
          <Link href="/todos" className="flex-1 text-center bg-gray-100 py-3 rounded-lg">취소</Link>
          <button type="submit" className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-bold">수정</button>
          <button type="button" onClick={handleDelete} className="flex-1 bg-red-500 text-white py-3 rounded-lg font-bold">삭제</button>
        </div>
      </form>
    </div>
  );
}