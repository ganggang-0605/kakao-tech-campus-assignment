'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewTodoPage() {
  const [text, setText] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    await fetch('/api/todos', { 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify({ text, date }) 
    });
    
    router.push('/todos');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex flex-col justify-center py-12 px-4 sm:px-6 font-sans">
      <div className="max-w-md w-full mx-auto p-10 rounded-[28px] bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)]">
        <h1 className="text-3xl font-bold mb-8 text-[#1D1D1F] tracking-tight">새 할 일 추가</h1>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="block text-[15px] font-medium text-[#86868B] mb-2">언제 할까요?</label>
            <input 
              type="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
              className="w-full bg-[#F5F5F7] border border-transparent p-4 rounded-xl focus:outline-none focus:ring-[3px] focus:ring-[#0071E3]/30 focus:border-[#0071E3] transition-all text-[17px] text-[#1D1D1F]" 
            />
          </div>

          <div>
            <label className="block text-[15px] font-medium text-[#86868B] mb-2">무엇을 해볼까요?</label>
            <input 
              type="text" 
              value={text} 
              onChange={(e) => setText(e.target.value)} 
              placeholder="예: 과제 마무리하기"
              className="w-full bg-[#F5F5F7] border border-transparent p-4 rounded-xl focus:outline-none focus:ring-[3px] focus:ring-[#0071E3]/30 focus:border-[#0071E3] transition-all text-[17px] text-[#1D1D1F]" 
              autoFocus
            />
          </div>
          
          <div className="flex gap-3 pt-2">
            <Link href="/todos" className="flex-1 text-center bg-[#F5F5F7] text-[#1D1D1F] py-3.5 rounded-xl font-semibold hover:bg-[#E8E8ED] transition-colors">취소</Link>
            <button type="submit" className="flex-[2] bg-[#0071E3] text-white py-3.5 rounded-xl font-semibold text-[17px] hover:bg-[#0077ED] transition-all">추가 완료</button>
          </div>
        </form>
      </div>
    </div>
  );
}