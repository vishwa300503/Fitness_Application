import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import WorkoutLog from './components/WorkoutLog';
import Statistics from './components/Statistics';
import GoalSetting from './components/GoalSetting';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-pink-50"> {/* Lightest pink-gray background */}
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/workout-log" element={<WorkoutLog />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/goals" element={<GoalSetting />} />
              <Route path="/" element={<Dashboard />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
