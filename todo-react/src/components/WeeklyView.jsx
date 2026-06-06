import { getFormattedDate } from '../utils/dateUtils';

function WeeklyView({ selectedDate, setSelectedDate, weekStartDate, setWeekStartDate, todos }) {
  const currentMondayObj = new Date(weekStartDate);
  const todayString = getFormattedDate(new Date());

  // 기준일 조정으로 주차 오프셋 이동
  const changeWeek = (days) => {
    const newDate = new Date(currentMondayObj);
    newDate.setDate(newDate.getDate() + days);
    setWeekStartDate(getFormattedDate(newDate));
  };

  const dayNames = ['월', '화', '수', '목', '금', '토', '일'];
  
  // 반복문을 통해 7일치 주간 데이터 배열을 동적 생성
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(currentMondayObj);
    d.setDate(currentMondayObj.getDate() + i);
    const dateStr = getFormattedDate(d);
    
    return {
      dateStr,
      dayName: dayNames[i],
      dayNum: d.getDate(),
      count: todos.filter(t => t.date === dateStr).length
    };
  });

  return (
    <div className="bg-purple-50 p-4 rounded-xl mb-6">
      <div className="flex flex-row justify-between items-center mb-4">
        <button onClick={() => changeWeek(-7)} className="p-2 text-purple-600 font-bold hover:bg-purple-100 rounded-lg">&lt;</button>
        <span className="font-bold text-gray-700">
          {currentMondayObj.getFullYear()}년 {currentMondayObj.getMonth() + 1}월
        </span>
        <button onClick={() => changeWeek(7)} className="p-2 text-purple-600 font-bold hover:bg-purple-100 rounded-lg">&gt;</button>
      </div>
      
      {/* 가로 배치 형태로 요일 요소 나열 */}
      <div className="flex flex-row justify-between w-full">
        {weekDays.map(day => {
          const isSelected = day.dateStr === selectedDate;
          const isToday = day.dateStr === todayString;
          
          return (
            <div 
              key={day.dateStr}
              onClick={() => setSelectedDate(day.dateStr)}
              className={`flex flex-col items-center justify-center w-10 h-14 rounded-lg cursor-pointer transition-all
                ${isSelected ? 'bg-purple-600 text-white shadow-md' : 'hover:bg-purple-100 text-gray-600'}
                ${isToday && !isSelected ? 'ring-2 ring-purple-300' : ''}
              `}
            >
              <span className="text-xs">{day.dayName}</span>
              <span className="text-sm font-bold">{day.dayNum}</span>
              {/* 해당 일자의 할 일 개수 조건부 렌더링 */}
              {day.count > 0 && (
                <span className={`text-[10px] mt-1 ${isSelected ? 'text-purple-200' : 'text-purple-500 font-bold'}`}>
                  {day.count}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WeeklyView;