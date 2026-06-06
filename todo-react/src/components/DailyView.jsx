import { getFormattedDate } from '../utils/dateUtils';

function DailyView({ selectedDate, setSelectedDate }) {
  // 선택 기준일 갱신
  const changeDay = (days) => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + days);
    setSelectedDate(getFormattedDate(d));
  };

  return (
    <div className="flex flex-row justify-center items-center gap-6 mb-6">
      <button onClick={() => changeDay(-1)} className="p-2 text-purple-600 hover:bg-gray-100 rounded-lg font-bold">&lt;</button>
      <h2 className="text-lg font-bold text-gray-800 w-32 text-center">{selectedDate}</h2>
      <button onClick={() => changeDay(1)} className="p-2 text-purple-600 hover:bg-gray-100 rounded-lg font-bold">&gt;</button>
    </div>
  );
}

export default DailyView;