import React from 'react';
import { Activity, Target, PlusCircle, BarChart2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  // Mock data (replace with actual data from API)
  const recentWorkouts = [
    { id: 1, type: 'Running', duration: 30, date: '2024-03-15' },
    { id: 2, type: 'Weightlifting', duration: 45, date: '2024-03-14' },
    { id: 3, type: 'Cycling', duration: 60, date: '2024-03-13' },
  ];

  const weeklyGoal = { target: 150, current: 75 };

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-gray-900">Welcome, {user?.email}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Workouts Card */}
        <div className="bg-gradient-to-r from-pink-300 to-yellow-300 p-6 rounded-lg shadow-xl transform hover:scale-105 transition duration-300">
          <h2 className="text-2xl font-semibold mb-4 flex items-center text-gray-800">
            <Activity className="mr-2 text-red-500" />
            Recent Workouts
          </h2>
          <ul className="space-y-3">
            {recentWorkouts.map((workout) => (
              <li key={workout.id} className="flex items-center justify-between bg-white p-3 rounded-lg shadow hover:bg-gray-100 transition duration-200">
                <span className="font-medium text-gray-700">{workout.type}</span>
                <span className="text-gray-600">{workout.duration} min</span>
                <span className="text-sm text-gray-500">{workout.date}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Weekly Goal Progress Card */}
        <div className="bg-gradient-to-r from-blue-300 to-teal-300 p-6 rounded-lg shadow-xl transform hover:scale-105 transition duration-300">
          <h2 className="text-2xl font-semibold mb-4 flex items-center text-gray-800">
            <Target className="mr-2 text-yellow-500" />
            Weekly Goal Progress
          </h2>
          <div className="mb-2">
            <div className="flex justify-between mb-1">
              <span className="font-medium text-gray-700">{weeklyGoal.current} / {weeklyGoal.target} min</span>
              <span className="font-medium text-gray-700">{Math.round((weeklyGoal.current / weeklyGoal.target) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${(weeklyGoal.current / weeklyGoal.target) * 100}%` }}
              ></div>
            </div>
          </div>
          <p className="text-sm text-gray-600">Keep it up! You're on track to meet your weekly goal.</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <Link 
          to="/workout-log" 
          className="flex-1 bg-gradient-to-r from-green-400 to-green-600 text-white p-4 rounded-lg shadow-lg hover:from-green-500 hover:to-green-700 transition duration-300 flex items-center justify-center transform hover:scale-105"
        >
          <PlusCircle className="mr-2" />
          Log New Workout
        </Link>
        <Link 
          to="/statistics" 
          className="flex-1 bg-gradient-to-r from-blue-400 to-blue-600 text-white p-4 rounded-lg shadow-lg hover:from-blue-500 hover:to-blue-700 transition duration-300 flex items-center justify-center transform hover:scale-105"
        >
          <BarChart2 className="mr-2" />
          View Statistics
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
