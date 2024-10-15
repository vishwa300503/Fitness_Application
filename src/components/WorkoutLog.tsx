import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Activity, Clock, Flame, Calendar } from 'lucide-react';

interface WorkoutData {
  id: number;
  activityType: string;
  duration: number;
  caloriesBurned: number;
  date: string;
}

const CALORIE_BURN_RATES: { [key: string]: number } = {
  running: 11.4,
  cycling: 7.5,
  swimming: 8.3,
  weightlifting: 3.8,
};

const WorkoutLog: React.FC = () => {
  const { user } = useAuth();
  const [workoutData, setWorkoutData] = useState<WorkoutData>({
    id: 0,
    activityType: '',
    duration: 0,
    caloriesBurned: 0,
    date: new Date().toISOString().split('T')[0],
  });
  const [errors, setErrors] = useState<Partial<WorkoutData>>({});
  const [recentWorkouts, setRecentWorkouts] = useState<WorkoutData[]>([]);

  useEffect(() => {
    if (workoutData.activityType && workoutData.duration) {
      const caloriesBurned = Math.round(CALORIE_BURN_RATES[workoutData.activityType] * workoutData.duration);
      setWorkoutData(prev => ({ ...prev, caloriesBurned }));
    }
  }, [workoutData.activityType, workoutData.duration]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'date') {
      // Convert date from DD-MM-YYYY to YYYY-MM-DD
      const [day, month, year] = value.split('-');
      const formattedDate = `${year}-${month}-${day}`;
      setWorkoutData(prev => ({ ...prev, [name]: formattedDate }));
    } else {
      setWorkoutData(prev => ({ ...prev, [name]: name === 'duration' ? Number(value) : value }));
    }
    validateField(name, value);
  };

  const validateField = (name: string, value: string | number) => {
    let error = '';
    switch (name) {
      case 'activityType':
        if (!value) error = 'Activity type is required';
        break;
      case 'duration':
        if (!value) error = 'Duration is required';
        else if (Number(value) <= 0) error = 'Duration must be greater than 0';
        break;
      case 'date':
        if (!value) error = 'Date is required';
        break;
    }
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(errors).some(error => error) || Object.values(workoutData).some(value => !value)) {
      alert('Please fill all fields correctly');
      return;
    }
    console.log('Workout data to be saved:', workoutData);

    const newWorkout = { ...workoutData, id: Date.now() };
    setRecentWorkouts(prev => [newWorkout, ...prev].slice(0, 5));

    // Reset form after submission
    setWorkoutData({
      id: 0,
      activityType: '',
      duration: 0,
      caloriesBurned: 0,
      date: new Date().toISOString().split('T')[0],
    });
    setErrors({});
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gradient-to-r from-green-400 to-blue-500 p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-3xl font-bold mb-4 flex items-center text-white">
          <Activity className="mr-2" />
          Log Workout
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="activityType" className="block mb-1 font-medium text-white">Activity Type</label>
            <select
              id="activityType"
              name="activityType"
              value={workoutData.activityType}
              onChange={handleInputChange}
              required
              className={`w-full px-3 py-2 border rounded ${errors.activityType ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select an activity</option>
              <option value="running">Running</option>
              <option value="cycling">Cycling</option>
              <option value="swimming">Swimming</option>
              <option value="weightlifting">Weightlifting</option>
            </select>
            {errors.activityType && <p className="text-red-500 text-sm mt-1">{errors.activityType}</p>}
          </div>
          <div>
            <label htmlFor="duration" className="block mb-1 font-medium text-white">Duration (minutes)</label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={workoutData.duration}
              onChange={handleInputChange}
              required
              min="1"
              className={`w-full px-3 py-2 border rounded ${errors.duration ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
          </div>
          <div>
            <label htmlFor="caloriesBurned" className="block mb-1 font-medium text-white">Calories Burned</label>
            <input
              type="number"
              id="caloriesBurned"
              name="caloriesBurned"
              value={workoutData.caloriesBurned}
              readOnly
              className="w-full px-3 py-2 border rounded bg-gray-100"
            />
          </div>
          <div>
            <label htmlFor="date" className="block mb-1 font-medium text-white">Date (DD-MM-YYYY)</label>
            <input
              type="text"
              id="date"
              name="date"
              value={workoutData.date.split('-').reverse().join('-')}
              onChange={handleInputChange}
              placeholder="DD-MM-YYYY"
              required
              className={`w-full px-3 py-2 border rounded ${errors.date ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300">
            Log Workout
          </button>
        </form>
      </div>

      {recentWorkouts.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Recent Workouts</h3>
          <ul className="space-y-3">
            {recentWorkouts.map((workout) => (
              <li key={workout.id} className="flex items-center justify-between bg-blue-50 p-3 rounded hover:bg-blue-100 transition duration-300">
                <div className="flex items-center">
                  <Activity className="mr-2 text-blue-500" />
                  <span className="font-medium text-gray-800">{workout.activityType}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="flex items-center text-gray-600">
                    <Clock className="mr-1" size={16} />
                    {workout.duration} min
                  </span>
                  <span className="flex items-center text-gray-600">
                    <Flame className="mr-1" size={16} />
                    {workout.caloriesBurned} cal
                  </span>
                  <span className="flex items-center text-gray-500">
                    <Calendar className="mr-1" size={16} />
                    {workout.date.split('-').reverse().join('-')}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WorkoutLog;
