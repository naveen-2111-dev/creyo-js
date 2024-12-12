import React, { useState, useEffect } from "react";
import '@/app/globals.css';
import { useRouter } from 'next/router';

// SVG component for timer
const TimerSVG = ({ timeLeft }) => {
  const radius = 40;
  const strokeWidth = 5;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (timeLeft / 60) * circumference;
  return (
    <svg width={100} height={100} className="timer-svg">
      <circle
        cx="50"
        cy="50"
        r={radius}
        stroke="#eee"
        strokeWidth={strokeWidth}
        fill="none"
      />
      <circle
        cx="50"
        cy="50"
        r={radius}
        stroke="green"
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform="rotate(-90 50 50)"
      />
    </svg>
  );
};

const questionsData = {
  Python: [
    {
      question: "Which of the following is a valid Python data type?",
      options: ["Array", "List", "Queue", "Stack"],
      answer: "List",
    },
    {
      question: "What is the time complexity of searching in a balanced binary search tree?",
      options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"],
      answer: "O(log n)",
    },
    {
      question: "What is the output of list(range(0, 10, 2))?",
      options: ["[0, 2, 4, 6, 8, 10]", "[0, 2, 4, 6, 8]", "[1, 3, 5, 7, 9]", "[2, 4, 6, 8, 10]"],
      answer: "[0, 2, 4, 6, 8]",
    },
  ],
  Java: [
    {
      question: "What is the primary purpose of the Java Virtual Machine (JVM)?",
      options: [
        "To compile Java code",
        "To execute Java bytecode",
        "To manage memory directly",
        "To provide a graphical user interface"
      ],
      answer: "To execute Java bytecode",
    },
  ],
  c :[
    {
      question: "What is the primary purpose of the Java Virtual Machine (JVM)?",
      options: [
        "To compile Java code",
        "To execute Java bytecode",
        "To manage memory directly",
        "To provide a graphical user interface"
      ],
      answer: "To execute Java bytecode",
    },
  ],
  dsa:[
    {
      question: "What is the primary purpose of the Java Virtual Machine (JVM)?",
      options: [
        "To compile Java code",
        "To execute Java bytecode",
        "To manage memory directly",
        "To provide a graphical user interface"
      ],
      answer: "To execute Java bytecode",
    },
  ],
};

export default function TestPage() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute in seconds
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerStatus, setAnswerStatus] = useState(null);
  const [testCompleted, setTestCompleted] = useState(false);
  const [lastTestTime, setLastTestTime] = useState(null);
  const [exitAttempts, setExitAttempts] = useState(0);
  const router = useRouter();
  const [isTestActive, setIsTestActive] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  useEffect(() => {
    // Prevent tab switching during the test
    if (isTestActive) {
      window.addEventListener('beforeunload', (event) => {
        event.preventDefault();
        event.returnValue = '';
      });
    } else {
      window.removeEventListener('beforeunload', () => {});
    }

    return () => {
      window.removeEventListener('beforeunload', () => {});
    };
  }, [isTestActive]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPageVisible(document.visibilityState === 'visible');

      if (!document.visibilityState === 'visible' && !testCompleted) {
        // User switched tabs or minimized the window, end the test
        setTestCompleted(true);
        router.push('/dashboard/freelancer');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [testCompleted, router]);

  const handleEscKey = (event) => {
    if (!isFullscreen || event.keyCode !== 27) return;
  
    // Confirmation before exiting fullscreen on Esc press
    if (confirm("Are you sure you want to exit the test?")) {
      setTestCompleted(true);
      router.push('/dashboard/freelancer'); 
    }
  };
  
  useEffect(() => {
    window.addEventListener('keydown', handleEscKey);
  
    // Handle exiting fullscreen mode on unmount
    return () => {
      window.removeEventListener('keydown', handleEscKey);
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    };
  }, [testCompleted, router]);
  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0 && !testCompleted) {
        setTimeLeft(timeLeft - 1);
      } else if (timeLeft === 0) {
        setTestCompleted(true);
        clearInterval(timer);
        router.push('/dashboard/freelancer'); // Redirect when timer ends
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, testCompleted, router]);

  useEffect(() => {
    const storedLastTestTime = localStorage.getItem("lastTestTime");
    if (storedLastTestTime) {
      setLastTestTime(new Date(storedLastTestTime));
    }

    const storedExitAttempts = localStorage.getItem("exitAttempts");
    if (storedExitAttempts) {
      setExitAttempts(Number(storedExitAttempts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("exitAttempts", exitAttempts);
  }, [exitAttempts]);
  const handleAnswer = (option) => {
    const currentQuestion = questionsData[selectedTopic][currentQuestionIndex];
    setSelectedAnswer(option);
    const isCorrect = option === currentQuestion.answer;
    setAnswerStatus(isCorrect ? "correct" : "incorrect");
    if (isCorrect) setScore(score + 1);

    // Delay before moving to the next question
    setTimeout(() => {
      if (currentQuestionIndex + 1 < questionsData[selectedTopic].length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setTestCompleted(true);
        const now = new Date();
        localStorage.setItem("lastTestTime", now.toISOString());
        setLastTestTime(now);
      }
      setSelectedAnswer(null);
      setAnswerStatus(null);
    }, 1000);
  };

  const startTest = (topic) => {
    const now = new Date();
    setIsTestActive(true);
    if (lastTestTime && now - lastTestTime < 3600000) { // 1 hour in milliseconds
      alert("You can only retake the test after 1 hour.");
      return;
    }
  
    setSelectedTopic(topic);
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimeLeft(60);
    setTestCompleted(false);
    setExitAttempts(0); // Reset exit attempts when starting a new test
    localStorage.setItem("exitAttempts", 0);
  
    // Enter fullscreen mode
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  };

  const handleExit = () => {
    setIsTestActive(false);
    if (exitAttempts >= 2) {
      alert("You cannot exit the test more than twice.");
      return;
    }
    const updatedAttempts = exitAttempts + 1;
    setExitAttempts(updatedAttempts);
    localStorage.setItem("exitAttempts", updatedAttempts);
    router.push('/dashboard/freelancer');
  };
 // Example SVG icons for the topics
const icons = {
    Python: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.1 2a3.003 3.003 0 00-2.835 2H10C5.037 4 2 7.038 2 12c0 4.962 3.038 8 8 8h1v-5H9v-1h5a2 2 0 002-2V7.165A3.003 3.003 0 0014.1 2zM14 6.1A1.1 1.1 0 1115.1 7 1.102 1.102 0 0114 6.1zm-4 4h2v2h-2zM12 22a3.003 3.003 0 002.835-2H14c4.963 0 8-3.038 8-8 0-4.962-3.037-8-8-8h-1v5h4v1h-5a2 2 0 00-2 2v4.835A3.003 3.003 0 0011.9 22zM10 17.9A1.1 1.1 0 1111.1 19 1.102 1.102 0 0110 17.9zm2-4h-2v-2h2z" />
      </svg>
    ),
    C: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.052 10H18a7 7 0 100 4h1.052A9.92 9.92 0 0120 15.025c-.238.206-.493.417-.764.62-.313.24-.637.466-.98.676A9.99 9.99 0 0012 20c-2.03 0-3.928-.61-5.5-1.681-.527-.347-1.038-.755-1.5-1.201C2.226 15.68 2 13.879 2 12s.226-3.68.5-5.118c.462-.446.973-.854 1.5-1.201A9.99 9.99 0 0112 4a9.99 9.99 0 014.756 1.679c.343.21.667.436.98.676.27.203.526.414.764.62A9.92 9.92 0 0120 8.975 9.999 9.999 0 0019.052 10z" />
      </svg>
    ),
    DSA: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a10 10 0 00-8 16.53V22a2 2 0 002 2h2.053A10 10 0 1012 2zm0 18.93a8.004 8.004 0 016.273-8.247l-3.153-3.153L12 14.07 8.88 8.53l1.06-1.06L12 11.82l1.12-4.35a8 8 0 01-1.12 13.46z" />
      </svg>
    ),
    Java: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3.19A8.812 8.812 0 013.19 12 8.812 8.812 0 0112 20.81 8.812 8.812 0 0120.81 12 8.812 8.812 0 0112 3.19zM12 19a7.021 7.021 0 010-14c1.525 0 2.952.483 4.13 1.289a4.758 4.758 0 00-.558 3.038h-3.572a.5.5 0 100 1h4.198c.145 2.275.898 3.73 2.07 4.37-.136.437-.305.854-.497 1.249-1.178.803-2.605 1.286-4.131 1.286a7.021 7.021 0 01-4.13-1.289A4.758 4.758 0 008.49 9.673h3.573a.5.5 0 100-1H7.864c-.145-2.275-.897-3.73-2.069-4.37.136-.437.305-.854.497-1.249A7.021 7.021 0 0112 5z" />
      </svg>
    ),
  };
  
  if (!selectedTopic) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-6xl bg-white p-8 rounded-md shadow-md" style={{ height: "600px" }}>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Select a Topic
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-16 h-full">
            {Object.keys(questionsData).map((topic) => (
              <button
                key={topic}
                className="w-64 h-64 rounded-lg bg-blue-500 pt-30 text-white hover:bg-blue-600 transition-all flex flex-col items-center justify-center"
                onClick={() => startTest(topic)}
              >
                {icons[topic]}
                <span className="mt-2">{topic}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
  const currentQuestion = questionsData[selectedTopic][currentQuestionIndex];
  const toggleFullscreen = () => {
    const element = document.documentElement;
    if (!isFullscreen) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <div className="bg-white p-8 rounded-md shadow-md relative">
          {/* Test Name */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            {selectedTopic} Test
          </h2>

          {/* Timer SVG */}
          <div className="flex justify-center mb-6">
            <TimerSVG timeLeft={timeLeft} />
          </div>

          {/* Score */}
          <div className="flex justify-center mb-6">
            <div className="text-xl font-medium text-blue-500">
              Score: {score}/{questionsData[selectedTopic].length}
            </div>
          </div>

          {/* Question Number */}
          <div className="absolute top-4 right-4 text-gray-600 text-sm font-medium">
            {currentQuestionIndex + 1}/{questionsData[selectedTopic].length}
          </div>

          {/* Question Text */}
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            {currentQuestion.question}
          </h3>

          {/* Options */}
          <div className="grid gap-4">
            {currentQuestion.options.map((option) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = answerStatus === "correct";
              const isCurrentCorrect = isSelected && isCorrect;
              const isCurrentIncorrect = isSelected && !isCorrect;

              return (
                <button
                  key={option}
                  className={`py-2 px-4 rounded-lg transition-all
                    ${isCurrentCorrect ? "bg-green-500 text-white" : ""}
                    ${isCurrentIncorrect ? "bg-red-500 text-white" : ""}
                    ${!isSelected ? "bg-orange-400 hover:bg-orange-600 text-white" : ""}
                  `}
                  onClick={() => handleAnswer(option)}
                  disabled={!!selectedAnswer}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {/* Exit Button */}
          <button
            className="absolute top-4 left-4 text-xl font-semibold text-blue-500"
            onClick={handleExit} // Updated exit button logic
          >
            &lt; Exit
          </button>

          {/* Completion Message */}
          {testCompleted && (
            <div className="mt-6 text-center text-lg font-medium text-green-600">
              Test Completed! Your Score: {score}/{questionsData[selectedTopic].length}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
