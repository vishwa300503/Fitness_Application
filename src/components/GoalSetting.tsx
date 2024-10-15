import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface Goal {
  type: string;
  target: number;
  period: 'weekly' | 'monthly';
}

const GoalSetting: React.FC = () => {
  const { user } = useAuth();
  const [goal, setGoal] = useState<Goal>({
    type: '',
    target: 0,
    period: 'weekly',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setGoal(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call to save goal
    console.log('Goal to be saved:', goal);
    // Reset form after submission
    setGoal({
      type: '',
      target: 0,
      period: 'weekly',
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">Set Your Fitness Goal</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="type" className="block text-lg text-white mb-2">Goal Type</label>
          <select
            id="type"
            name="type"
            value={goal.type}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
          >
            <option value="">Select a goal type</option>
            <option value="workout_minutes">Workout Minutes</option>
            <option value="calories_burned">Calories Burned</option>
            <option value="workouts_completed">Workouts Completed</option>
          </select>
        </div>
        <div>
          <label htmlFor="target" className="block text-lg text-white mb-2">Target</label>
          <input
            type="number"
            id="target"
            name="target"
            value={goal.target}
            onChange={handleInputChange}
            required
            min="1"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
          />
        </div>
        <div>
          <label htmlFor="period" className="block text-lg text-white mb-2">Period</label>
          <select
            id="period"
            name="period"
            value={goal.period}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <button 
          type="submit" 
          className="w-full py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300 transform hover:scale-105"
        >
          Set Goal
        </button>
      </form>
    </div>
  );
};

export default GoalSetting;
