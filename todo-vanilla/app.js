// 제어할 DOM 요소 일괄 추출함
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const alertMessage = document.getElementById('alert-message');
const todoList = document.getElementById('todo-list');
const filterBtns = document.querySelectorAll('.filter-btn');
const prevWeekBtn = document.getElementById('prev-week');
const nextWeekBtn = document.getElementById('next-week');
const weekDaysContainer = document.getElementById('week-days');
const currentMonthEl = document.getElementById('current-month');

// 로컬스토리지 연동 및 초기 데이터 바인딩함
let todos = JSON.parse(localStorage.getItem('todos')) || [];
// 고유 ID 식별자 값 확보함
let todoId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 0;
// 기본 조회 필터 상태값 지정함
let currentFilter = 'all';

// 시스템의 변하지 않는 오늘 날짜 정보 보관함
const todayObj = new Date();
// 사용자가 선택하여 조회 중인 타겟 날짜 정보 관리용 변수임
let selectedDateObj = new Date();

// Date 객체를 YYYY-MM-DD 포맷 문자열로 변환 처리함
function getFormattedDate(dateObj) {
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

const todayString = getFormattedDate(todayObj);
let selectedDateString = getFormattedDate(selectedDateObj);

// 특정 날짜가 속한 주의 월요일 날짜 객체를 찾아 반환함
function getMonday(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
}

// 주간 뷰의 화면 기준점이 될 월요일 변수 세팅함
let currentMondayObj = getMonday(selectedDateObj);

// 데이터를 로컬스토리지에 JSON 형태로 영구 보관함
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// 달력 영역과 투두 목록을 전체 새로고침하여 리렌더링함
function renderApp() {
    renderWeek();
    renderTodos();
}

// 월요일부터 일요일까지의 가로형 주간 뷰 화면을 렌더링함
function renderWeek() {
    weekDaysContainer.innerHTML = '';
    
    // 달력 상단 헤더에 현재 주차의 연도와 월 표기함
    currentMonthEl.textContent = `${currentMondayObj.getFullYear()}년 ${currentMondayObj.getMonth() + 1}월`;

    const dayNames = ['월', '화', '수', '목', '금', '토', '일'];

    // 7일 주기를 반복 순회하며 컴포넌트 동적 생성함
    for (let i = 0; i < 7; i++) {
        const loopDateObj = new Date(currentMondayObj);
        loopDateObj.setDate(currentMondayObj.getDate() + i);
        const loopDateString = getFormattedDate(loopDateObj);

        // 로컬 데이터 배열 내 해당 날짜의 총 할 일 수 집계함
        const dayTodoCount = todos.filter(todo => todo.date === loopDateString).length;

        // 개별 일자 카드 엘리먼트 생성함
        const dayCard = document.createElement('div');
        dayCard.className = 'day-card';

        // 실제 오늘 날짜인 카드에 식별 스타일 부여함
        if (loopDateString === todayString) {
            dayCard.classList.add('today');
        }
        // 사용자가 선택하여 활성화한 카드에 셀렉트 스타일 부여함
        if (loopDateString === selectedDateString) {
            dayCard.classList.add('selected');
        }

        // 특정 날짜 카드 클릭 시 타겟 날짜 갱신 및 데이터 동기화 처리함
        dayCard.onclick = () => {
            selectedDateObj = loopDateObj;
            selectedDateString = loopDateString;
            renderApp();
        };

        // 서브 요소 할 일 개수 유무에 따른 동적 클래스 할당 처리함
        const countClass = dayTodoCount > 0 ? 'day-count has-count' : 'day-count';

        // 카드 하부에 요일명, 일자 숫자, 할 일 카운터 주입함
        dayCard.innerHTML = `
            <span class="day-name">${dayNames[i]}</span>
            <span class="day-number">${loopDateObj.getDate()}</span>
            <span class="${countClass}">${dayTodoCount}</span>
        `;

        weekDaysContainer.appendChild(dayCard);
    }
}

// 조건 및 날짜 필터에 매칭되는 투두 데이터 리스트를 출력함
function renderTodos() {
    todoList.innerHTML = '';

    // 선택된 날짜 및 활성화된 필터 조건 부합 여부 감별함
    const filteredTodos = todos.filter(todo => {
        if (todo.date !== selectedDateString) return false;
        if (currentFilter === 'active') return !todo.isCompleted;
        if (currentFilter === 'completed') return todo.isCompleted;
        return true;
    });

    // 최종 선별된 투두 객체들을 노드로 변환 후 바인딩함
    filteredTodos.forEach(todo => {
        const li = document.createElement('li');
        li.className = 'todo-item';
        
        if (todo.isCompleted) {
            li.classList.add('completed');
        }

        li.innerHTML = `
            <div class="todo-content">
                <input type="checkbox" ${todo.isCompleted ? 'checked' : ''} onchange="toggleTodo(${todo.id})">
                <span class="todo-text">${todo.text}</span>
            </div>
            <div class="btn-group">
                <button class="edit-btn" onclick="editTodo(${todo.id})">수정</button>
                <button class="delete-btn" onclick="deleteTodo(${todo.id})">삭제</button>
            </div>
        `;

        todoList.appendChild(li);
    });
}

// 텍스트 검증 후 신규 할 일 레코드 데이터 적재 처리함
function addTodo() {
    const text = todoInput.value.trim();

    // 누락값 검출 시 텍스트 알림창 기동 후 블로킹함
    if (text === '') {
        alertMessage.classList.remove('hidden');
        todoInput.focus();
        return;
    }

    alertMessage.classList.add('hidden');

    // 선택 날짜 문자열 정보를 주입하여 구조 정의함
    const newTodo = {
        id: todoId++,
        text: text,
        isCompleted: false,
        date: selectedDateString
    };

    todos.push(newTodo);
    saveTodos();
    renderApp();

    todoInput.value = '';
    todoInput.focus();
}

// 체크박스 제어로 할 일 토글링 상태를 업데이트함
function toggleTodo(id) {
    todos = todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, isCompleted: !todo.isCompleted };
        }
        return todo;
    });
    saveTodos();
    renderApp();
}

// 프롬프트를 통해 텍스트 노드 수정 및 갱신함
function editTodo(id) {
    const targetTodo = todos.find(todo => todo.id === id);
    if (!targetTodo) return;

    const newText = prompt('할 일을 수정하세요:', targetTodo.text);

    if (newText !== null && newText.trim() !== '') {
        todos = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, text: newText.trim() };
            }
            return todo;
        });
        saveTodos();
        renderApp();
    }
}

// 식별 ID 타겟 데이터를 컬렉션 배열에서 누락 제거함
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    renderApp();
}

// 등록 서브밋 버튼 핸들러 설정함
addBtn.addEventListener('click', addTodo);

// 텍스트 필드 엔터 액션 가로채기함
todoInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTodo();
    }
});

// 조회 모드 제어 탭들의 스위칭 이벤트 정의함
filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        filterBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentFilter = e.target.getAttribute('data-filter');
        renderTodos();
    });
});

// 이전 주차로 역방향 달력 타임라인 탐색함
prevWeekBtn.addEventListener('click', () => {
    currentMondayObj.setDate(currentMondayObj.getDate() - 7);
    renderApp();
});

// 다음 주차로 정방향 달력 타임라인 탐색함
nextWeekBtn.addEventListener('click', () => {
    currentMondayObj.setDate(currentMondayObj.getDate() + 7);
    renderApp();
});

// 메인 루틴 최초 구동 지점임
renderApp();