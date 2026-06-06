function TodoFilter({ filter, setFilter }) {
  // 필터 탭 옵션 배열 정의
  const tabs = [
    { id: 'all', label: '전체' },
    { id: 'active', label: '진행 중' },
    { id: 'completed', label: '완료' }
  ];

  return (
    <div className="flex flex-row gap-2 mb-4 w-full">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setFilter(tab.id)}
          className={`flex-1 py-2 rounded-lg font-medium text-sm transition-colors
            ${filter === tab.id ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default TodoFilter;