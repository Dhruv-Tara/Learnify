import React from 'react';
import { Sparkles, ChevronRight, Star, Rocket, Brain, Trophy } from 'lucide-react';
import Game from './components/Game';

export default function App() {
  const [started, setStarted] = React.useState(false);

  if (started) {
    return <Game />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto p-8">
        {/* Hero Section */}
        <div className="text-center space-y-12 py-20">
          <div className="relative inline-block">
            <div className="relative">
              <h1 className="text-7xl font-bold mb-4 animate-float bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                Learnify
              </h1>
              <div className="absolute -top-8 -left-8">
                <div className="relative">
                  <Sparkles className="w-10 h-10 text-yellow-400 animate-twinkle" />
                  <Star className="absolute -top-2 -right-4 w-6 h-6 text-yellow-400 animate-twinkle-delayed" />
                </div>
              </div>
              <div className="absolute -top-6 -right-8">
                <div className="relative">
                  <Sparkles className="w-10 h-10 text-yellow-400 animate-twinkle-delayed" />
                  <Star className="absolute -bottom-2 -left-4 w-6 h-6 text-yellow-400 animate-twinkle" />
                </div>
              </div>
            </div>
            <p className="text-3xl font-medium text-gray-600 mt-6 animate-fadeIn">
              Where Learning Becomes an Adventure
            </p>
          </div>

          <div className="flex justify-center items-center gap-8 animate-fadeIn">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                <Brain className="w-8 h-8 text-blue-600" />
              </div>
              <span className="text-gray-700 font-medium">Smart Learning</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
                <Rocket className="w-8 h-8 text-purple-600" />
              </div>
              <span className="text-gray-700 font-medium">Quick Progress</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center">
                <Trophy className="w-8 h-8 text-pink-600" />
              </div>
              <span className="text-gray-700 font-medium">Fun Rewards</span>
            </div>
          </div>

          <div className="relative mt-12">
            <Star className="absolute top-0 left-1/4 w-6 h-6 text-yellow-400 animate-float-slow" />
            <Star className="absolute top-4 right-1/4 w-4 h-4 text-yellow-400 animate-float-delayed" />
            <button
              onClick={() => setStarted(true)}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full overflow-hidden transition-all duration-300 ease-in-out hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Your Journey
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white p-8 rounded-2xl shadow-lg transform hover:scale-105 transition-transform">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Interactive Learning</h3>
            <p className="text-gray-600">Engage with dynamic quizzes and challenges that make learning fun and memorable.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg transform hover:scale-105 transition-transform">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <Rocket className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Multiple Subjects</h3>
            <p className="text-gray-600">Explore various subjects from mathematics to geography in an engaging way.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg transform hover:scale-105 transition-transform">
            <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
              <Trophy className="w-6 h-6 text-pink-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Progress Tracking</h3>
            <p className="text-gray-600">Track your learning journey with our intuitive scoring system.</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <p className="text-gray-600 text-lg mb-8">
            Ready to embark on your learning adventure? Join thousands of learners today!
          </p>
          <button
            onClick={() => setStarted(true)}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Get Started Now
          </button>
        </div>
      </div>
    </div>
  );
}