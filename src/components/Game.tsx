import React, { useState, useEffect } from 'react';
import { Star, Brain, Book, Award, ChevronRight, Sparkles, Globe, Target, MapPin } from 'lucide-react';

type GameType = 'math' | 'language' | 'knowledge' | 'bubble-mcq' | 'geography';
type Difficulty = 'easy' | 'medium' | 'hard';

const speak = (text: string) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.9;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
};

const geographyQuestions = {
  easy: [
    
    {
      q: "Bangalore is the capital of",
      options: ["Karnataka", "Kerala", "Tamil Nadu", "Andhra Pradesh"],
      a: "Karnataka"
    },
    {
      q: "Mumbai is the capital of",
      options: ["Gujarat", "Maharashtra", "Goa", "Rajasthan"],
      a: "Maharashtra"
    },
    {
      q: "Chennai is the capital of",
      options: ["Kerala", "Karnataka", "Andhra Pradesh", "Tamil Nadu"],
      a: "Tamil Nadu"
    },
    
    {
      q: "Bhopal is the capital of",
      options: ["Madhya Pradesh", "Uttar Pradesh", "Bihar", "Jharkhand"],
      a: "Madhya Pradesh"
    },
    {
      q: "Lucknow is the capital of",
      options: ["Bihar", "Uttar Pradesh", "Rajasthan", "Gujarat"],
      a: "Uttar Pradesh"
    },
    {
      q: "Jaipur is the capital of",
      options: ["Gujarat", "Maharashtra", "Rajasthan", "Madhya Pradesh"],
      a: "Rajasthan"
    },
    
    {
      q: "Dehradun is the capital of",
      options: ["Himachal Pradesh", "Uttarakhand", "Sikkim", "Arunachal Pradesh"],
      a: "Uttarakhand"
    },
    {
      q: "Gangtok is the capital of",
      options: ["Sikkim", "Manipur", "Meghalaya", "Mizoram"],
      a: "Sikkim"
    },
    {
      q: "Itanagar is the capital of",
      options: ["Nagaland", "Manipur", "Arunachal Pradesh", "Assam"],
      a: "Arunachal Pradesh"
    }
  ],
  medium: [
    
    {
      q: "Bhopal is the capital of",
      options: ["Madhya Pradesh", "Uttar Pradesh", "Bihar", "Jharkhand"],
      a: "Madhya Pradesh"
    },
    {
      q: "Lucknow is the capital of",
      options: ["Bihar", "Uttar Pradesh", "Rajasthan", "Gujarat"],
      a: "Uttar Pradesh"
    },
    {
      q: "Jaipur is the capital of",
      options: ["Gujarat", "Maharashtra", "Rajasthan", "Madhya Pradesh"],
      a: "Rajasthan"
    },

    {
      q: "Dehradun is the capital of",
      options: ["Himachal Pradesh", "Uttarakhand", "Sikkim", "Arunachal Pradesh"],
      a: "Uttarakhand"
    },
    {
      q: "Gangtok is the capital of",
      options: ["Sikkim", "Manipur", "Meghalaya", "Mizoram"],
      a: "Sikkim"
    },
    {
      q: "Itanagar is the capital of",
      options: ["Nagaland", "Manipur", "Arunachal Pradesh", "Assam"],
      a: "Arunachal Pradesh"
    }
  ],
  hard: [
    {
      q: "Dehradun is the capital of",
      options: ["Himachal Pradesh", "Uttarakhand", "Sikkim", "Arunachal Pradesh"],
      a: "Uttarakhand"
    },
    {
      q: "Gangtok is the capital of",
      options: ["Sikkim", "Manipur", "Meghalaya", "Mizoram"],
      a: "Sikkim"
    },
    {
      q: "Itanagar is the capital of",
      options: ["Nagaland", "Manipur", "Arunachal Pradesh", "Assam"],
      a: "Arunachal Pradesh"
    }
  ]
};


const knowledgeQuestions = {
  "easy": [
      {"q": "What is the capital of France?", "a": "Paris"},
      {"q": "How many legs does a spider have?", "a": "Eight"},
      {"q": "What is 10 + 5?", "a": "15"},
      {"q": "Which planet is known as the Red Planet?", "a": "Mars"},
      {"q": "What is the largest mammal in the world?", "a": "Blue whale"},
      {"q": "Which shape has three sides?", "a": "Triangle"},
      {"q": "How many letters are there in the English alphabet?", "a": "26"},
      {"q": "Which is the fastest land animal?", "a": "Cheetah"},
      {"q": "How many colors are there in a rainbow?", "a": "Seven"},
      {"q": "What do bees collect from flowers to make honey?", "a": "Nectar"}
  ],
  "medium": [
      {"q": "What is the square root of 64?", "a": "8"},
      {"q": "Who wrote the play 'Romeo and Juliet'?", "a": "William Shakespeare"},
      {"q": "Which gas do plants absorb from the air?", "a": "Carbon dioxide"},
      {"q": "What is the longest river in the world?", "a": "Nile"},
      {"q": "Which continent has the most countries?", "a": "Africa"}
  ],
  "hard": [
      {"q": "What is the chemical symbol for gold?", "a": "Au"},
      {"q": "Who developed the theory of relativity?", "a": "Albert Einstein"},
      {"q": "Which number is known as the 'only even prime number'?", "a": "2"},
      {"q": "How many bones are there in an adult human body?", "a": "206"},
      {"q": "What is the largest organ in the human body?", "a": "Skin"}
  ]
};

const mcqQuestions = {
  "easy": [
      {"q": "What color is a banana?", "options": ["Red", "Blue", "Yellow", "Green"], "a": "Yellow"},
      {"q": "How many legs does a cat have?", "options": ["Two", "Four", "Six", "Eight"], "a": "Four"},
      {"q": "Which animal says 'Moo'?", "options": ["Dog", "Cat", "Cow", "Sheep"], "a": "Cow"}
  ],
  "medium": [
      {"q": "Which planet do we live on?", "options": ["Mars", "Venus", "Earth", "Jupiter"], "a": "Earth"},
      {"q": "What do you call a baby cat?", "options": ["Puppy", "Kitten", "Foal", "Cub"], "a": "Kitten"},
      {"q": "What is the color of grass?", "options": ["Blue", "Green", "Yellow", "Red"], "a": "Green"}
  ],
  "hard": [
      {"q": "Which gas do plants absorb from the air?", "options": ["Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"], "a": "Carbon Dioxide"},
      {"q": "Who was the first man to step on the moon?", "options": ["Buzz Aldrin", "Neil Armstrong", "Yuri Gagarin", "Michael Collins"], "a": "Neil Armstrong"},
      {"q": "How many continents are there on Earth?", "options": ["Five", "Six", "Seven", "Eight"], "a": "Seven"}
  ]
};

interface BubbleProps {
  text: string;
  onClick: () => void;
  isFloating?: boolean;
  index: number;
  totalBubbles: number;
}

interface BalloonProps {
  text: string;
  onClick: () => void;
  index: number;
}

const Balloon: React.FC<BalloonProps> = ({ text, onClick, index }) => {
  const positions = [
    { x: 25, y: 30 }, 
    { x: 75, y: 30 }, 
    { x: 25, y: 70 }, 
    { x: 75, y: 70 }, 
  ];

  const colors = [
    'from-red-400 to-red-500 hover:from-red-500 hover:to-red-600',
    'from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600',
    'from-green-400 to-green-500 hover:from-green-500 hover:to-green-600',
    'from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600'
  ];

  const position = positions[index];
  const color = colors[index];

  return (
    <button
      onClick={onClick}
      style={{
        position: 'absolute',
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
        zIndex: 10,
      }}
      className={`bg-gradient-to-r ${color} text-white px-8 py-4 rounded-full 
                 shadow-lg transition-all duration-300 cursor-pointer text-xl md:text-2xl min-w-[180px]
                 hover:scale-105 hover:shadow-xl`}
    >
      {text}
    </button>
  );
};

const Bubble: React.FC<BubbleProps> = ({ text, onClick, isFloating = true, index, totalBubbles }) => {
  const initialX = ((index + 1) * (100 / (totalBubbles + 1)));
  const [position, setPosition] = useState({ 
    x: initialX,
    y: 110 
  });

  useEffect(() => {
    if (!isFloating) return;
    
    const interval = setInterval(() => {
      setPosition(prev => {
        const newY = prev.y - 0.2; 
        const maxDeviation = 5; 
        const newX = initialX + (Math.sin(newY / 20) * maxDeviation);
        
        if (newY < 0) {
          return { x: initialX, y: 110 };
        }
        
        return { x: newX, y: newY };
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isFloating, initialX]);

  return (
    <button
      onClick={onClick}
      style={{
        position: isFloating ? 'absolute' : 'relative',
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
        zIndex: Math.floor(position.y), 
      }}
      className="bg-gradient-to-r from-blue-400 to-blue-500 text-white px-6 py-3 rounded-full 
                 shadow-lg hover:from-blue-500 hover:to-blue-600 transition-all duration-300
                 animate-bounce cursor-pointer text-sm md:text-base min-w-[120px]"
    >
      {text}
    </button>
  );
};

export default function Game() {
  const scre = localStorage.getItem('score') === null ? 0 : parseInt(localStorage.getItem('score') || '0');
  const [score, setScore] = useState(scre);
  const [gameType, setGameType] = useState<GameType | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [currentQuestion, setCurrentQuestion] = useState<string>('');
  const [answer, setAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<string>('');
  const [mcqOptions, setMcqOptions] = useState<string[]>([]);

  useEffect(() => {
    if (gameType) {
      generateQuestion(gameType);
    }
  }, [difficulty, gameType]);

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const generateQuestion = (type: GameType) => {
    if (type === 'geography') {
      const questions = geographyQuestions[difficulty];
      const question = questions[Math.floor(Math.random() * questions.length)];
      setCurrentQuestion(question.q);
      setMcqOptions(question.options);
      setCorrectAnswer(question.a);
    } else if (type === 'bubble-mcq') {
      const questions = mcqQuestions[difficulty];
      const question = questions[Math.floor(Math.random() * questions.length)];
      setCurrentQuestion(question.q);
      setMcqOptions(question.options);
      setCorrectAnswer(question.a);
    } else if (type === 'math') {
      const num1 = Math.floor(Math.random() * (difficulty === 'easy' ? 9 : difficulty === 'medium' ? 99 : 999));
      const num2 = Math.floor(Math.random() * (difficulty === 'easy' ? 9 : difficulty === 'medium' ? 99 : 999));
      setCurrentQuestion(`${num1} + ${num2} = ?`);
      setCorrectAnswer((num1 + num2).toString());
    } else if (type === 'language') {
      const words = {
        easy: ['cat', 'dog', 'hat', 'bat', 'rat'],
        medium: ['house', 'mouse', 'cloud', 'happy', 'smile'],
        hard: ['elephant', 'giraffe', 'beautiful', 'wonderful', 'fantastic']
      };
      const word = words[difficulty][Math.floor(Math.random() * words[difficulty].length)];
      setCurrentQuestion(`Spell the word:`);
      setCorrectAnswer(word);
      speak(word);
    } else if (type === 'knowledge') {
      const questions = knowledgeQuestions[difficulty];
      const question = questions[Math.floor(Math.random() * questions.length)];
      setCurrentQuestion(question.q);
      setCorrectAnswer(question.a);
    }
  };

  const checkAnswer = (submittedAnswer?: string) => {
    const finalAnswer = submittedAnswer || answer;
    const isAnswerCorrect = finalAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
    
    setIsCorrect(isAnswerCorrect);
    
    if (isAnswerCorrect) {
      setScore(prev => prev + (difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3));
      if (localStorage.getItem('score') === null) {
        localStorage.setItem('score', '0');
      } else {
        const score = parseInt(localStorage.getItem('score') || '0');
        localStorage.setItem('score', (score + (difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3)).toString());
      }
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2018/success-1-6297.wav');
      audio.play().catch(() => {});
    } else {
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2017/error-1-6296.wav');
      audio.play().catch(() => {});
    }
    
    setAnswer('');
    setTimeout(() => {
      setIsCorrect(null);
      if (gameType) generateQuestion(gameType);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-200 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-800 mb-2 flex items-center justify-center gap-2">
            <Sparkles className="w-8 h-8" />
            Learnify
            <Sparkles className="w-8 h-8" />
          </h1>
          <p className="text-purple-600">Learn and have fun!</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {!gameType ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-center mb-6">Choose Your Adventure!</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button
                  onClick={() => {
                    setGameType('math');
                    generateQuestion('math');
                  }}
                  className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl text-white hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105"
                >
                  <Brain className="w-12 h-12 mx-auto mb-4" />
                  <span className="text-xl font-semibold">Math Challenge</span>
                </button>
                <button
                  onClick={() => {
                    setGameType('language');
                    generateQuestion('language');
                  }}
                  className="p-6 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl text-white hover:from-purple-600 hover:to-purple-700 transition-all transform hover:scale-105"
                >
                  <Book className="w-12 h-12 mx-auto mb-4" />
                  <span className="text-xl font-semibold">Language Adventure</span>
                </button>
                <button
                  onClick={() => {
                    setGameType('knowledge');
                    generateQuestion('knowledge');
                  }}
                  className="p-6 bg-gradient-to-r from-green-500 to-green-600 rounded-xl text-white hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105"
                >
                  <Globe className="w-12 h-12 mx-auto mb-4" />
                  <span className="text-xl font-semibold">Knowledge Quest</span>
                </button>
                <button
                  onClick={() => {
                    setGameType('bubble-mcq');
                    generateQuestion('bubble-mcq');
                  }}
                  className="p-6 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl text-white hover:from-yellow-600 hover:to-yellow-700 transition-all transform hover:scale-105"
                >
                  <Target className="w-12 h-12 mx-auto mb-4" />
                  <span className="text-xl font-semibold">Bubble MCQ</span>
                </button>
                <button
                  onClick={() => {
                    setGameType('geography');
                    generateQuestion('geography');
                  }}
                  className="p-6 bg-gradient-to-r from-red-500 to-red-600 rounded-xl text-white hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-105 md:col-span-2"
                >
                  <MapPin className="w-12 h-12 mx-auto mb-4" />
                  <span className="text-xl font-semibold">Geography Explorer</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Star className="w-6 h-6 text-yellow-500" />
                  <span className="text-xl font-semibold">Score: {score}</span>
                </div>
                {gameType !== 'geography' && (
                  <div className="flex gap-2">
                    {['easy', 'medium', 'hard'].map((d) => (
                      <button
                        key={d}
                        onClick={() => setDifficulty(d as Difficulty)}
                        className={`px-4 py-2 rounded-lg ${
                          difficulty === d
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {d.charAt(0).toUpperCase() + d.slice(1)}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="text-center space-y-6">
                <h3 className="text-2xl font-bold text-gray-800">{currentQuestion}</h3>
                
                {gameType === 'bubble-mcq' ? (
                  <div className="relative h-[60vh] border-2 border-blue-200 rounded-lg bg-gradient-to-b from-blue-50 to-white overflow-hidden">
                    {mcqOptions.map((option, index) => (
                      <Bubble
                        key={option}
                        text={option}
                        onClick={() => checkAnswer(option)}
                        index={index}
                        totalBubbles={mcqOptions.length}
                      />
                    ))}
                  </div>
                ) : gameType === "geography" ? (
                  <div className="relative h-[60vh] border-2 border-blue-200 rounded-lg bg-gradient-to-b from-blue-50 to-white overflow-hidden">
                    {mcqOptions.map((option, index) => (
                      <Balloon
                        key={option}
                        text={option}
                        onClick={() => checkAnswer(option)}
                        index={index}
                      />
                    ))}
                  </div>
                ) : (
                  <>
                    {gameType === 'language' && (
                      <button
                        onClick={() => speak(correctAnswer)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        Hear Word Again
                      </button>
                    )}
                    <input
                      type="text"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
                      className="w-full max-w-md px-4 py-2 text-xl border-2 border-purple-300 rounded-lg focus:border-purple-500 focus:outline-none"
                      placeholder="Your answer..."
                    />
                    <button
                      onClick={() => checkAnswer()}
                      className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2 mx-auto"
                    >
                      Check Answer
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {isCorrect !== null && (
                  <div className={`text-xl font-semibold ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                    {isCorrect ? (
                      <div className="flex items-center justify-center gap-2">
                        <Award className="w-6 h-6" />
                        Great job! Keep going!
                      </div>
                    ) : (
                      <div>
                        Try again! The correct answer was: {correctAnswer}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  setGameType(null);
                  setScore(0);
                  setAnswer('');
                  setIsCorrect(null);
                }}
                className="mt-8 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Back to Menu
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}