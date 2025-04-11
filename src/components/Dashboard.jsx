import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Activity, Calendar, Award, TrendingUp, PieChart, Clock, CheckCircle } from 'react-feather';
import gsap from 'gsap';
import { useHabits } from '../context/HabitContext';

const Dashboard = () => {
  const chartRef = useRef(null);
  const { habits, toggleHabitCompletion, getStats } = useHabits();
  
  // Get stats from context
  const stats = getStats();
  
  // Get today's habits
  const todaysHabits = habits.slice(0, 4); // Just showing the first 4 for now
  
  // Weekly data - in a real app, this would be calculated based on real data
  const weeklyData = [75, 60, 90, 85, 65, 70, 80];
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  // Animation for the chart
  useEffect(() => {
    if (chartRef.current) {
      // Reset heights first
      gsap.set(chartRef.current.children, { height: 0 });
      
      // Animate bars
      gsap.to(chartRef.current.children, {
        height: (i) => `${weeklyData[i]}%`,
        duration: 1,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.2
      });
    }
  }, []);
  
  // Format stats for display
  const statsData = [
    { 
      label: 'Active Habits', 
      value: stats.activeHabits, 
      icon: <Activity size={20} />, 
      color: 'bg-indigo-900/30 text-indigo-400' 
    },
    { 
      label: 'Current Streak', 
      value: `${stats.currentStreak} days`, 
      icon: <Award size={20} />, 
      color: 'bg-amber-900/30 text-amber-400' 
    },
    { 
      label: 'Completion Rate', 
      value: `${stats.averageCompletionRate}%`, 
      icon: <TrendingUp size={20} />, 
      color: 'bg-emerald-900/30 text-emerald-400' 
    },
    { 
      label: 'Longest Streak', 
      value: `${stats.longestStreak} days`, 
      icon: <Calendar size={20} />, 
      color: 'bg-blue-900/30 text-blue-400' 
    },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <h1 className="text-2xl font-bold mb-1 text-white">Dashboard</h1>
          <p className="text-gray-300">Track your habits and progress</p>
        </div>
        <p className="text-gray-300 font-medium">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat, index) => (
          <motion.div
            key={index}
            className="card border border-dailydev-darkCard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full ${stat.color} flex items-center justify-center`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-gray-300 text-sm">{stat.label}</p>
                <p className="text-xl font-bold text-white">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Progress Chart */}
        <motion.div 
          className="card border border-dailydev-darkCard"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
            <h2 className="font-bold text-lg flex items-center gap-2 text-white">
              <PieChart size={18} className="text-dailydev-purple" />
              Weekly Progress
            </h2>
            <div className="text-xs px-2 py-1 bg-dailydev-purple/30 text-dailydev-purple rounded-full font-medium">
              {stats.averageCompletionRate}% average
            </div>
          </div>
          
          <div className="flex h-48 items-end justify-between mt-4" ref={chartRef}>
            {weeklyData.map((value, index) => (
              <div className="relative group" key={index} style={{ width: '12%' }}>
                <div 
                  className={`w-full rounded-t-md ${
                    value >= 80 
                      ? 'bg-green-400' 
                      : value >= 60 
                        ? 'bg-blue-400' 
                        : 'bg-yellow-400'
                  }`} 
                  style={{ height: `${value}%` }}
                ></div>
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-dailydev-darkBlue text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {value}%
                </div>
                <div className="text-xs text-center mt-2 text-gray-300">{weekDays[index]}</div>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* Today's Habits */}
        <motion.div 
          className="card border border-dailydev-darkCard"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
            <h2 className="font-bold text-lg flex items-center gap-2 text-white">
              <Clock size={18} className="text-dailydev-purple" />
              Today's Habits
            </h2>
            <div className="text-xs px-2 py-1 bg-dailydev-purple/30 text-dailydev-purple rounded-full font-medium">
              {habits.filter(h => h.isCompleted).length}/{habits.length} completed
            </div>
          </div>
          
          <div className="space-y-3">
            {todaysHabits.map((habit) => (
              <motion.div
                key={habit.id}
                className="p-3 bg-dailydev-darkBlue rounded-lg flex items-center justify-between"
                whileHover={{ x: 5 }}
              >
                <div className="flex items-center gap-3">
                  <button 
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                      habit.isCompleted 
                        ? 'bg-green-900/40 text-green-400' 
                        : 'bg-dark-lighter text-gray-200'
                    }`}
                    onClick={() => toggleHabitCompletion(habit.id)}
                  >
                    {habit.isCompleted && <CheckCircle size={16} />}
                  </button>
                  <span className={`font-medium ${habit.isCompleted ? 'line-through text-gray-500' : 'text-white'}`}>
                    {habit.title}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-300">
                    {habit.isCompleted ? 'Completed' : 'Pending'}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <motion.button
              className="btn btn-outline w-full border-dailydev-purple text-white hover:text-white hover:bg-dailydev-purple"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.location.hash = '#habits'}
            >
              View All Habits
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard; 