import React, { useState, useEffect, useRef } from 'react';import React, { useState, useEffect, useRef } from 'react';

import { import { 

  Play,   Play, 

  Pause,   Pause, 

  Square,   Square, 

  Plus,   Plus, 

  Trash2,   Trash2, 

  Check,   Check, 

  Clock,   Clock, 

  Target,   Target, 

  TrendingUp   TrendingUp 

} from 'lucide-react';} from 'lucide-react';



// 타입 정의// ?�???�의

interface Todo {interface Todo {

  id: string;  id: string;

  text: string;  text: string;

  completed: boolean;  completed: boolean;

  pomodoros: number;  pomodoros: number;

  completedPomodoros: number;  completedPomodoros: number;

}}



interface TimerState {interface TimerState {

  isRunning: boolean;  isRunning: boolean;

  isPaused: boolean;  isPaused: boolean;

  timeLeft: number;  timeLeft: number;

  totalTime: number;  totalTime: number;

  currentTodoId: string | null;  currentTodoId: string | null;

}}



// 컴포넌트들// 컴포?�트??

const TodoItem: React.FC<{const TodoItem: React.FC<{

  todo: Todo;  todo: Todo;

  isActive: boolean;  isActive: boolean;

  onToggle: (id: string) => void;  onToggle: (id: string) => void;

  onDelete: (id: string) => void;  onDelete: (id: string) => void;

  onStartTimer: (id: string) => void;  onStartTimer: (id: string) => void;

}> = ({ todo, isActive, onToggle, onDelete, onStartTimer }) => {}> = ({ todo, isActive, onToggle, onDelete, onStartTimer }) => {

  return (  return (

    <div className={`p-4 rounded-lg border transition-all duration-200 ${    <div className={`p-4 rounded-lg border transition-all duration-200 ${

      isActive       isActive 

        ? 'bg-blue-600/20 border-blue-500 shadow-lg'         ? 'bg-blue-600/20 border-blue-500 shadow-lg' 

        : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'        : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'

    }`}>    }`}>

      <div className="flex items-center justify-between">      <div className="flex items-center justify-between">

        <div className="flex items-center space-x-3">        <div className="flex items-center space-x-3">

          <button          <button

            onClick={() => onToggle(todo.id)}            onClick={() => onToggle(todo.id)}

            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${

              todo.completed               todo.completed 

                ? 'bg-green-500 border-green-500'                 ? 'bg-green-500 border-green-500' 

                : 'border-gray-400 hover:border-green-400'                : 'border-gray-400 hover:border-green-400'

            }`}            }`}

          >          >

            {todo.completed && <Check className="w-4 h-4 text-white" />}            {todo.completed && <Check className="w-4 h-4 text-white" />}

          </button>          </button>

          <span className={`text-lg ${todo.completed ? 'line-through text-gray-400' : 'text-white'}`}>          <span className={`text-lg ${todo.completed ? 'line-through text-gray-400' : 'text-white'}`}>

            {todo.text}            {todo.text}

          </span>          </span>

        </div>        </div>

        <div className="flex items-center space-x-2">        <div className="flex items-center space-x-2">

          <div className="flex items-center space-x-1 text-sm text-gray-400">          <div className="flex items-center space-x-1 text-sm text-gray-400">

            <Target className="w-4 h-4" />            <Target className="w-4 h-4" />

            <span>{todo.completedPomodoros}/{todo.pomodoros}</span>            <span>{todo.completedPomodoros}/{todo.pomodoros}</span>

          </div>          </div>

          <button          <button

            onClick={() => onStartTimer(todo.id)}            onClick={() => onStartTimer(todo.id)}

            disabled={todo.completed || isActive}            disabled={todo.completed || isActive}

            className={`p-2 rounded-lg transition-colors ${            className={`p-2 rounded-lg transition-colors ${

              todo.completed || isActive              todo.completed || isActive

                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'

                : 'bg-blue-600 text-white hover:bg-blue-700'                : 'bg-blue-600 text-white hover:bg-blue-700'

            }`}            }`}

          >          >

            <Play className="w-4 h-4" />            <Play className="w-4 h-4" />

          </button>          </button>

          <button          <button

            onClick={() => onDelete(todo.id)}            onClick={() => onDelete(todo.id)}

            className="p-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"            className="p-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"

          >          >

            <Trash2 className="w-4 h-4" />            <Trash2 className="w-4 h-4" />

          </button>          </button>

        </div>        </div>

      </div>      </div>

    </div>    </div>

  );  );

};};



const Timer: React.FC<{const Timer: React.FC<{

  timer: TimerState;  timer: TimerState;

  onStart: () => void;  onStart: () => void;

  onPause: () => void;  onPause: () => void;

  onStop: () => void;  onStop: () => void;

  currentTodo: Todo | null;  currentTodo: Todo | null;

}> = ({ timer, onStart, onPause, onStop, currentTodo }) => {}> = ({ timer, onStart, onPause, onStop, currentTodo }) => {

  const progress = ((timer.totalTime - timer.timeLeft) / timer.totalTime) * 100;  const progress = ((timer.totalTime - timer.timeLeft) / timer.totalTime) * 100;

  const minutes = Math.floor(timer.timeLeft / 60);  const minutes = Math.floor(timer.timeLeft / 60);

  const seconds = timer.timeLeft % 60;  const seconds = timer.timeLeft % 60;



  return (  return (

    <div className="bg-gray-800 rounded-xl p-8 text-center">    <div className="bg-gray-800 rounded-xl p-8 text-center">

      <h2 className="text-2xl font-bold text-white mb-4">포모도로 타이머</h2>      <h2 className="text-2xl font-bold text-white mb-4">?�모?�로 ?�?�머</h2>

      {currentTodo && (      {currentTodo && (

        <p className="text-gray-300 mb-6">현재 작업: {currentTodo.text}</p>        <p className="text-gray-300 mb-6">?�재 ?�업: {currentTodo.text}</p>

      )}      )}

            

      {/* 원형 진행바 */}      {/* ?�형 진행�?*/}

      <div className="relative w-64 h-64 mx-auto mb-6">      <div className="relative w-64 h-64 mx-auto mb-6">

        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">

          {/* 배경 원 */}          {/* 배경 ??*/}

          <circle          <circle

            cx="50"            cx="50"

            cy="50"            cy="50"

            r="45"            r="45"

            stroke="currentColor"            stroke="currentColor"

            strokeWidth="8"            strokeWidth="8"

            fill="none"            fill="none"

            className="text-gray-700"            className="text-gray-700"

          />          />

          {/* 진행 원 */}          {/* 진행 ??*/}

          <circle          <circle

            cx="50"            cx="50"

            cy="50"            cy="50"

            r="45"            r="45"

            stroke="currentColor"            stroke="currentColor"

            strokeWidth="8"            strokeWidth="8"

            fill="none"            fill="none"

            strokeDasharray={`${2 * Math.PI * 45}`}            strokeDasharray={`${2 * Math.PI * 45}`}

            strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}            strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}

            className="text-blue-500 transition-all duration-1000 ease-linear"            className="text-blue-500 transition-all duration-1000 ease-linear"

            strokeLinecap="round"            strokeLinecap="round"

          />          />

        </svg>        </svg>

        <div className="absolute inset-0 flex items-center justify-center">        <div className="absolute inset-0 flex items-center justify-center">

          <div className="text-center">          <div className="text-center">

            <div className="text-4xl font-bold text-white">            <div className="text-4xl font-bold text-white">

              {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}              {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}

            </div>            </div>

            <div className="text-sm text-gray-400 mt-1">            <div className="text-sm text-gray-400 mt-1">

              {Math.round(progress)}% 완료              {Math.round(progress)}% ?�료

            </div>            </div>

          </div>          </div>

        </div>        </div>

      </div>      </div>



      {/* 타이머 컨트롤 버튼 */}      {/* ?�?�머 컨트�?버튼 */}

      <div className="flex justify-center space-x-4">      <div className="flex justify-center space-x-4">

        {!timer.isRunning ? (        {!timer.isRunning ? (

          <button          <button

            onClick={onStart}            onClick={onStart}

            className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"            className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"

          >          >

            <Play className="w-5 h-5" />            <Play className="w-5 h-5" />

            <span>시작</span>            <span>?�작</span>

          </button>          </button>

        ) : (        ) : (

          <button          <button

            onClick={onPause}            onClick={onPause}

            className="flex items-center space-x-2 px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"            className="flex items-center space-x-2 px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"

          >          >

            <Pause className="w-5 h-5" />            <Pause className="w-5 h-5" />

            <span>일시정지</span>            <span>?�시?��?</span>

          </button>          </button>

        )}        )}

        <button        <button

          onClick={onStop}          onClick={onStop}

          className="flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"          className="flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"

        >        >

          <Square className="w-5 h-5" />          <Square className="w-5 h-5" />

          <span>정지</span>          <span>?��?</span>

        </button>        </button>

      </div>      </div>

    </div>    </div>

  );  );

};};



const Statistics: React.FC<{const Statistics: React.FC<{

  todos: Todo[];  todos: Todo[];

}> = ({ todos }) => {}> = ({ todos }) => {

  const totalPomodoros = todos.reduce((sum, todo) => sum + todo.completedPomodoros, 0);  const totalPomodoros = todos.reduce((sum, todo) => sum + todo.completedPomodoros, 0);

  const totalTime = totalPomodoros * 25; // 25분 per pomodoro  const totalTime = totalPomodoros * 25; // 25�?per pomodoro

  const completedTodos = todos.filter(todo => todo.completed).length;  const completedTodos = todos.filter(todo => todo.completed).length;



  return (  return (

    <div className="bg-gray-800 rounded-xl p-6">    <div className="bg-gray-800 rounded-xl p-6">

      <h3 className="text-xl font-bold text-white mb-4 flex items-center">      <h3 className="text-xl font-bold text-white mb-4 flex items-center">

        <TrendingUp className="w-5 h-5 mr-2" />        <TrendingUp className="w-5 h-5 mr-2" />

        통계        ?�계

      </h3>      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="text-center">        <div className="text-center">

          <div className="text-3xl font-bold text-blue-400">{totalPomodoros}</div>          <div className="text-3xl font-bold text-blue-400">{totalPomodoros}</div>

          <div className="text-sm text-gray-400">완료된 포모도로</div>          <div className="text-sm text-gray-400">?�료???�모?�로</div>

        </div>        </div>

        <div className="text-center">        <div className="text-center">

          <div className="text-3xl font-bold text-green-400">{totalTime}</div>          <div className="text-3xl font-bold text-green-400">{totalTime}</div>

          <div className="text-sm text-gray-400">총 집중 시간 (분)</div>          <div className="text-sm text-gray-400">�?집중 ?�간 (�?</div>

        </div>        </div>

        <div className="text-center">        <div className="text-center">

          <div className="text-3xl font-bold text-purple-400">{completedTodos}</div>          <div className="text-3xl font-bold text-purple-400">{completedTodos}</div>

          <div className="text-sm text-gray-400">완료된 할 일</div>          <div className="text-sm text-gray-400">?�료??????/div>

        </div>        </div>

      </div>      </div>

    </div>    </div>

  );  );

};};



// 메인 컴포넌트// 메인 컴포?�트

const PomodoroTodo: React.FC = () => {const PomodoroTodo: React.FC = () => {

  const [todos, setTodos] = useState<Todo[]>([]);  const [todos, setTodos] = useState<Todo[]>([]);

  const [newTodoText, setNewTodoText] = useState('');  const [newTodoText, setNewTodoText] = useState('');

  const [timer, setTimer] = useState<TimerState>({  const [timer, setTimer] = useState<TimerState>({

    isRunning: false,    isRunning: false,

    isPaused: false,    isPaused: false,

    timeLeft: 25 * 60, // 25분    timeLeft: 25 * 60, // 25�?

    totalTime: 25 * 60,    totalTime: 25 * 60,

    currentTodoId: null,    currentTodoId: null,

  });  });



  const intervalRef = useRef<number | null>(null);  const intervalRef = useRef<number | null>(null);

  const audioRef = useRef<{ play: () => void } | null>(null);  const audioRef = useRef<{ play: () => void } | null>(null);



  // localStorage에서 데이터 로드  // localStorage?�서 ?�이??로드

  useEffect(() => {  useEffect(() => {

    const savedTodos = localStorage.getItem('pomodoro-todos');    const savedTodos = localStorage.getItem('pomodoro-todos');

    if (savedTodos) {    if (savedTodos) {

      setTodos(JSON.parse(savedTodos));      setTodos(JSON.parse(savedTodos));

    }    }

  }, []);  }, []);



  // todos 변경 시 localStorage에 저장  // todos 변�???localStorage???�??

  useEffect(() => {  useEffect(() => {

    localStorage.setItem('pomodoro-todos', JSON.stringify(todos));    localStorage.setItem('pomodoro-todos', JSON.stringify(todos));

  }, [todos]);  }, [todos]);



  // 알림음 설정  // ?�림???�정

  useEffect(() => {  useEffect(() => {

    // 간단한 알림음 생성 (Web Audio API 사용)    // 간단???�림???�성 (Web Audio API ?�용)

    const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();    const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();

    const createBeep = () => {    const createBeep = () => {

      const oscillator = audioContext.createOscillator();      const oscillator = audioContext.createOscillator();

      const gainNode = audioContext.createGain();      const gainNode = audioContext.createGain();

            

      oscillator.connect(gainNode);      oscillator.connect(gainNode);

      gainNode.connect(audioContext.destination);      gainNode.connect(audioContext.destination);

            

      oscillator.frequency.value = 800;      oscillator.frequency.value = 800;

      oscillator.type = 'sine';      oscillator.type = 'sine';

            

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);

      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

            

      oscillator.start(audioContext.currentTime);      oscillator.start(audioContext.currentTime);

      oscillator.stop(audioContext.currentTime + 0.5);      oscillator.stop(audioContext.currentTime + 0.5);

    };    };

        

    audioRef.current = { play: createBeep };    audioRef.current = { play: createBeep };

  }, []);  }, []);



  // 브라우저 알림 권한 요청  // 브라?��? ?�림 권한 ?�청

  useEffect(() => {  useEffect(() => {

    if ('Notification' in window && Notification.permission === 'default') {    if ('Notification' in window && Notification.permission === 'default') {

      Notification.requestPermission();      Notification.requestPermission();

    }    }

  }, []);  }, []);



  // 타이머 로직  // ?�?�머 로직

  useEffect(() => {  useEffect(() => {

    if (timer.isRunning && !timer.isPaused) {    if (timer.isRunning && !timer.isPaused) {

      intervalRef.current = window.setInterval(() => {      intervalRef.current = window.setInterval(() => {

        setTimer(prev => {        setTimer(prev => {

          if (prev.timeLeft <= 1) {          if (prev.timeLeft <= 1) {

            // 타이머 완료            // ?�?�머 ?�료

            handleTimerComplete();            handleTimerComplete();

            return {            return {

              ...prev,              ...prev,

              isRunning: false,              isRunning: false,

              timeLeft: 0,              timeLeft: 0,

            };            };

          }          }

          return {          return {

            ...prev,            ...prev,

            timeLeft: prev.timeLeft - 1,            timeLeft: prev.timeLeft - 1,

          };          };

        });        });

      }, 1000);      }, 1000);

    } else {    } else {

      if (intervalRef.current) {      if (intervalRef.current) {

        clearInterval(intervalRef.current);        clearInterval(intervalRef.current);

        intervalRef.current = null;        intervalRef.current = null;

      }      }

    }    }



    return () => {    return () => {

      if (intervalRef.current) {      if (intervalRef.current) {

        clearInterval(intervalRef.current);        clearInterval(intervalRef.current);

      }      }

    };    };

  }, [timer.isRunning, timer.isPaused]); // eslint-disable-line react-hooks/exhaustive-deps  }, [timer.isRunning, timer.isPaused]); // eslint-disable-line react-hooks/exhaustive-deps



  const handleTimerComplete = () => {  const handleTimerComplete = () => {

    // 알림음 재생    // ?�림???�생

    if (audioRef.current) {    if (audioRef.current) {

      audioRef.current.play();      audioRef.current.play();

    }    }



    // 브라우저 알림    // 브라?��? ?�림

    if ('Notification' in window && Notification.permission === 'granted') {    if ('Notification' in window && Notification.permission === 'granted') {

      new Notification('포모도로 완료!', {      new Notification('?�모?�로 ?�료!', {

        body: '25분 집중 시간이 완료되었습니다. 휴식을 취하세요!',        body: '25�?집중 ?�간???�료?�었?�니?? ?�식??취하?�요!',

        icon: '/vite.svg',        icon: '/vite.svg',

      });      });

    }    }



    // 완료된 포모도로 수 증가    // ?�료???�모?�로 ??증�?

    if (timer.currentTodoId) {    if (timer.currentTodoId) {

      setTodos(prev => prev.map(todo =>       setTodos(prev => prev.map(todo => 

        todo.id === timer.currentTodoId         todo.id === timer.currentTodoId 

          ? { ...todo, completedPomodoros: todo.completedPomodoros + 1 }          ? { ...todo, completedPomodoros: todo.completedPomodoros + 1 }

          : todo          : todo

      ));      ));

    }    }

  };  };



  const addTodo = () => {  const addTodo = () => {

    if (newTodoText.trim()) {    if (newTodoText.trim()) {

      const newTodo: Todo = {      const newTodo: Todo = {

        id: Date.now().toString(),        id: Date.now().toString(),

        text: newTodoText.trim(),        text: newTodoText.trim(),

        completed: false,        completed: false,

        pomodoros: 1,        pomodoros: 1,

        completedPomodoros: 0,        completedPomodoros: 0,

      };      };

      setTodos(prev => [...prev, newTodo]);      setTodos(prev => [...prev, newTodo]);

      setNewTodoText('');      setNewTodoText('');

    }    }

  };  };



  const toggleTodo = (id: string) => {  const toggleTodo = (id: string) => {

    setTodos(prev => prev.map(todo =>     setTodos(prev => prev.map(todo => 

      todo.id === id ? { ...todo, completed: !todo.completed } : todo      todo.id === id ? { ...todo, completed: !todo.completed } : todo

    ));    ));

  };  };



  const deleteTodo = (id: string) => {  const deleteTodo = (id: string) => {

    setTodos(prev => prev.filter(todo => todo.id !== id));    setTodos(prev => prev.filter(todo => todo.id !== id));

    if (timer.currentTodoId === id) {    if (timer.currentTodoId === id) {

      stopTimer();      stopTimer();

    }    }

  };  };



  const startTimer = (todoId: string) => {  const startTimer = (todoId: string) => {

    const todo = todos.find(t => t.id === todoId);    const todo = todos.find(t => t.id === todoId);

    if (todo && !todo.completed) {    if (todo && !todo.completed) {

      setTimer({      setTimer({

        isRunning: true,        isRunning: true,

        isPaused: false,        isPaused: false,

        timeLeft: 25 * 60,        timeLeft: 25 * 60,

        totalTime: 25 * 60,        totalTime: 25 * 60,

        currentTodoId: todoId,        currentTodoId: todoId,

      });      });

    }    }

  };  };



  const pauseTimer = () => {  const pauseTimer = () => {

    setTimer(prev => ({ ...prev, isPaused: !prev.isPaused }));    setTimer(prev => ({ ...prev, isPaused: !prev.isPaused }));

  };  };



  const stopTimer = () => {  const stopTimer = () => {

    setTimer({    setTimer({

      isRunning: false,      isRunning: false,

      isPaused: false,      isPaused: false,

      timeLeft: 25 * 60,      timeLeft: 25 * 60,

      totalTime: 25 * 60,      totalTime: 25 * 60,

      currentTodoId: null,      currentTodoId: null,

    });    });

  };  };



  const currentTodo = todos.find(todo => todo.id === timer.currentTodoId) || null;  const currentTodo = todos.find(todo => todo.id === timer.currentTodoId) || null;



  return (  return (

    <div className="min-h-screen bg-gray-900 text-white">    <div className="min-h-screen bg-gray-900 text-white">

      <div className="container mx-auto px-4 py-8">      <div className="container mx-auto px-4 py-8">

        <header className="text-center mb-8">        <header className="text-center mb-8">

          <h1 className="text-4xl font-bold mb-2 flex items-center justify-center">          <h1 className="text-4xl font-bold mb-2 flex items-center justify-center">

            <Clock className="w-10 h-10 mr-3 text-blue-400" />            <Clock className="w-10 h-10 mr-3 text-blue-400" />

            포모도로 투두            ?�모?�로 ?�두

          </h1>          </h1>

          <p className="text-gray-400">집중력 향상을 위한 할 일 관리 앱</p>          <p className="text-gray-400">집중???�상???�한 ????관�???/p>

        </header>        </header>



        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

          {/* 타이머 섹션 */}          {/* ?�?�머 ?�션 */}

          <div>          <div>

            <Timer            <Timer

              timer={timer}              timer={timer}

              onStart={() => timer.currentTodoId && startTimer(timer.currentTodoId)}              onStart={() => timer.currentTodoId && startTimer(timer.currentTodoId)}

              onPause={pauseTimer}              onPause={pauseTimer}

              onStop={stopTimer}              onStop={stopTimer}

              currentTodo={currentTodo}              currentTodo={currentTodo}

            />            />

          </div>          </div>



          {/* 통계 섹션 */}          {/* ?�계 ?�션 */}

          <div>          <div>

            <Statistics todos={todos} />            <Statistics todos={todos} />

          </div>          </div>

        </div>        </div>



        {/* 할 일 추가 */}        {/* ????추�? */}

        <div className="bg-gray-800 rounded-xl p-6 mb-6">        <div className="bg-gray-800 rounded-xl p-6 mb-6">

          <h2 className="text-xl font-bold mb-4">새 할 일 추가</h2>          <h2 className="text-xl font-bold mb-4">??????추�?</h2>

          <div className="flex space-x-4">          <div className="flex space-x-4">

            <input            <input

              type="text"              type="text"

              value={newTodoText}              value={newTodoText}

              onChange={(e) => setNewTodoText(e.target.value)}              onChange={(e) => setNewTodoText(e.target.value)}

              onKeyPress={(e) => e.key === 'Enter' && addTodo()}              onKeyPress={(e) => e.key === 'Enter' && addTodo()}

              placeholder="할 일을 입력하세요..."              placeholder="???�을 ?�력?�세??.."

              className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"              className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"

            />            />

            <button            <button

              onClick={addTodo}              onClick={addTodo}

              className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"              className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"

            >            >

              <Plus className="w-5 h-5" />              <Plus className="w-5 h-5" />

              <span>추가</span>              <span>추�?</span>

            </button>            </button>

          </div>          </div>

        </div>        </div>



        {/* 할 일 목록 */}        {/* ????목록 */}

        <div className="bg-gray-800 rounded-xl p-6">        <div className="bg-gray-800 rounded-xl p-6">

          <h2 className="text-xl font-bold mb-4">할 일 목록</h2>          <h2 className="text-xl font-bold mb-4">????목록</h2>

          {todos.length === 0 ? (          {todos.length === 0 ? (

            <p className="text-gray-400 text-center py-8">아직 할 일이 없습니다. 위에서 새 할 일을 추가해보세요!</p>            <p className="text-gray-400 text-center py-8">?�직 ???�이 ?�습?�다. ?�에???????�을 추�??�보?�요!</p>

          ) : (          ) : (

            <div className="space-y-4">            <div className="space-y-4">

              {todos.map(todo => (              {todos.map(todo => (

                <TodoItem                <TodoItem

                  key={todo.id}                  key={todo.id}

                  todo={todo}                  todo={todo}

                  isActive={timer.currentTodoId === todo.id}                  isActive={timer.currentTodoId === todo.id}

                  onToggle={toggleTodo}                  onToggle={toggleTodo}

                  onDelete={deleteTodo}                  onDelete={deleteTodo}

                  onStartTimer={startTimer}                  onStartTimer={startTimer}

                />                />

              ))}              ))}

            </div>            </div>

          )}          )}

        </div>        </div>

      </div>      </div>

    </div>    </div>

  );  );

};};



export default PomodoroTodo;export default PomodoroTodo;
