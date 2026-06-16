'use client';
import dynamic from 'next/dynamic';
import 'react-calendar/dist/Calendar.css';

const Calendar = dynamic(() => import('react-calendar'), { ssr: false });

export default function TodoCalendar() {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 mb-8">
      <h2 className="text-xl font-bold mb-4 text-slate-800">일정 확인</h2>
      <Calendar />
    </div>
  );
}