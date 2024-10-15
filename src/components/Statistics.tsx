import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Statistics: React.FC = () => {
  // Mock data (replace with actual data from API)
  const workoutTrends = [
    { date: '2024-03-01', duration: 30 },
    { date: '2024-03-02', duration: 45 },
    { date: '2024-03-03', duration: 60 },
    { date: '2024-03-04', duration: 30 },
    { date: '2024-03-05', duration: 45 },
  ];

  const activityTypes = [
    { name: 'Running', value: 40 },
    { name: 'Cycling', value: 30 },
    { name: 'Swimming', value: 20 },
    { name: 'Weightlifting', value: 10 },
  ];

  const COLORS = ['#FF5733', '#FFBD33', '#75FF33', '#338FFF'];

  return (
    <div className="bg-gradient-to-r from-purple-100 to-blue-100 min-h-screen p-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Workout Statistics</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
        <h3 className="text-2xl font-semibold mb-4">Workout Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={workoutTrends}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="duration" stroke="#FF5733" activeDot={{ r: 8 }} strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 mt-6">
        <h3 className="text-2xl font-semibold mb-4">Activity Types Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={activityTypes}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              dataKey="value"
            >
              {activityTypes.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Statistics;
