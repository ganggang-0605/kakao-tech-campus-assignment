import Link from 'next/link';
import { Suspense } from 'react';
import { getTodos } from '@/app/actions';
import SearchBar from './SearchBar';
import TodoCalendar from './TodoCalendar';

export default async function TodosPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ filter?: string, search?: string }> 
}) {
  const resolvedParams = await searchParams;
  const currentFilter = resolvedParams.filter || 'all';
  const todos = await getTodos(resolvedParams.filter, resolvedParams.search);

  return (
    <div className="min-h-screen bg-[#F5F5F7] py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-[#1D1D1F] tracking-tight">My Tasks</h1>
          <Link href="/todos/new" className="bg-[#0071E3] text-white px-5 py-2.5 rounded-xl hover:bg-[#0077ED] transition-all font-semibold shadow-sm">
            + 새 할 일
          </Link>
        </div>

        <TodoCalendar todos={todos} />

        <div className="flex flex-col gap-4 mb-8">
          <Suspense fallback={<div className="p-2 text-sm text-slate-500">검색창 로딩 중...</div>}>
            <SearchBar />
          </Suspense>
          <div className="flex gap-2 bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200 w-fit">
            <Link href="/todos" className={`px-5 py-2 rounded-xl font-semibold transition-all ${currentFilter === 'all' ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50'}`}>전체</Link>
            <Link href="/todos?filter=active" className={`px-5 py-2 rounded-xl font-semibold transition-all ${currentFilter === 'active' ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50'}`}>진행 중</Link>
            <Link href="/todos?filter=completed" className={`px-5 py-2 rounded-xl font-semibold transition-all ${currentFilter === 'completed' ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50'}`}>완료</Link>
          </div>
        </div>
        
        <ul className="space-y-4">
          {todos.map((todo: any) => (
            <li key={todo.id} className="p-5 border border-slate-200 rounded-2xl flex justify-between items-center bg-white shadow-sm">
              <div className="flex flex-col">
                <span className={`text-[17px] font-medium text-[#1D1D1F] ${todo.completed ? 'line-through text-slate-400' : ''}`}>
                  {todo.text}
                </span>
                <span className="text-[13px] text-[#86868B] font-medium mt-1.5">
                  {todo.date ? todo.date : '날짜 없음'}
                </span> 
              </div>
              <Link href={`/todos/${todo.id}`} className="text-sm font-semibold text-[#0071E3] hover:underline bg-blue-50 px-4 py-2 rounded-lg">
                수정
              </Link>
            </li>
          ))}
          {todos.length === 0 && (
            <div className="text-center py-20 bg-white border border-slate-200 rounded-3xl border-dashed">
              <p className="text-[#86868B] font-medium text-lg">해당하는 할 일이 없습니다.</p>
            </div>
          )}
        </ul>

      </div>
    </div>
  );
}