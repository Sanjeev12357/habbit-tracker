import { createContext, useState, useContext, useEffect } from 'react';

const HabitContext = createContext();

export const HabitProvider = ({ children }) => {
  // Load habits from localStorage if available
  const [habits, setHabits] = useState(() => {
    const savedHabits = localStorage.getItem('habits');
    if (savedHabits) {
      return JSON.parse(savedHabits);
    }
    return [
      {
        id: '1',
        title: 'Morning Meditation',
        description: 'Meditate for 10 minutes after waking up',
        streakCount: 7,
        completionRate: 85,
        category: 'Mindfulness',
        color: 'indigo',
        isCompleted: false,
        icon: '🧘‍♂️',
        createdAt: new Date().toISOString(),
        completedDates: [],
        frequency: 'daily',
      },
      {
        id: '2',
        title: 'Read a Book',
        description: 'Read at least 10 pages every day',
        streakCount: 12,
        completionRate: 92,
        category: 'Learning',
        color: 'blue',
        isCompleted: true,
        icon: '📚',
        createdAt: new Date().toISOString(),
        completedDates: [new Date().toISOString()],
        frequency: 'daily',
      },
      {
        id: '3',
        title: 'Drink Water',
        description: 'Drink 8 glasses of water throughout the day',
        streakCount: 3,
        completionRate: 70,
        category: 'Health',
        color: 'emerald',
        isCompleted: false,
        icon: '💧',
        createdAt: new Date().toISOString(),
        completedDates: [],
        frequency: 'daily',
      },
      {
        id: '4',
        title: 'Exercise',
        description: 'Do a 30-minute workout',
        streakCount: 5,
        completionRate: 60,
        category: 'Fitness',
        color: 'amber',
        isCompleted: false,
        icon: '💪',
        createdAt: new Date().toISOString(),
        completedDates: [],
        frequency: 'daily',
      },
      {
        id: '5',
        title: 'Journal',
        description: 'Write in journal for 10 minutes',
        streakCount: 15,
        completionRate: 95,
        category: 'Mindfulness',
        color: 'violet',
        isCompleted: true,
        icon: '📝',
        createdAt: new Date().toISOString(),
        completedDates: [new Date().toISOString()],
        frequency: 'daily',
      },
    ];
  });

  // Save habits to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  // Add a new habit
  const addHabit = (habitData) => {
    const newHabit = {
      id: Date.now().toString(),
      ...habitData,
      streakCount: 0,
      completionRate: 0,
      isCompleted: false,
      createdAt: new Date().toISOString(),
      completedDates: [],
    };
    
    setHabits(prevHabits => [...prevHabits, newHabit]);
    return newHabit;
  };

  // Toggle completion status of a habit
  const toggleHabitCompletion = (habitId) => {
    setHabits(prevHabits => 
      prevHabits.map(habit => {
        if (habit.id === habitId) {
          const isNowCompleted = !habit.isCompleted;
          const today = new Date().toISOString().split('T')[0];
          
          // Update completedDates
          let completedDates = [...habit.completedDates];
          if (isNowCompleted) {
            completedDates.push(today);
          } else {
            completedDates = completedDates.filter(date => !date.startsWith(today));
          }
          
          // Calculate streak
          const sortedDates = [...completedDates].sort();
          let streakCount = 0;
          if (sortedDates.length > 0) {
            streakCount = calculateStreak(sortedDates);
          }
          
          // Calculate completion rate
          const daysElapsed = Math.ceil((new Date() - new Date(habit.createdAt)) / (1000 * 60 * 60 * 24));
          const completionRate = Math.round((completedDates.length / Math.max(1, daysElapsed)) * 100);
          
          return {
            ...habit,
            isCompleted: isNowCompleted,
            completedDates,
            streakCount,
            completionRate,
          };
        }
        return habit;
      })
    );
  };

  // Calculate streak from sorted dates
  const calculateStreak = (sortedDates) => {
    if (sortedDates.length === 0) return 0;
    
    let streak = 1;
    let maxStreak = 1;
    let prevDate = new Date(sortedDates[0]);
    
    for (let i = 1; i < sortedDates.length; i++) {
      const currentDate = new Date(sortedDates[i]);
      const diffDays = Math.round((currentDate - prevDate) / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        streak++;
        maxStreak = Math.max(maxStreak, streak);
      } else if (diffDays > 1) {
        streak = 1;
      }
      
      prevDate = currentDate;
    }
    
    return maxStreak;
  };

  // Delete a habit
  const deleteHabit = (habitId) => {
    setHabits(prevHabits => prevHabits.filter(habit => habit.id !== habitId));
  };

  // Edit an existing habit
  const editHabit = (habitId, updates) => {
    setHabits(prevHabits => 
      prevHabits.map(habit => 
        habit.id === habitId ? { ...habit, ...updates } : habit
      )
    );
  };

  // Get today's habits
  const getTodayHabits = () => {
    return habits.filter(habit => {
      // For now, just return all habits as if they are due today
      return true;
    });
  };

  // Get stats
  const getStats = () => {
    const activeHabits = habits.length;
    const completedToday = habits.filter(h => h.isCompleted).length;
    const streaks = habits.map(h => h.streakCount);
    const currentStreak = streaks.length > 0 ? Math.max(...streaks) : 0;
    const completionRates = habits.map(h => h.completionRate);
    const averageCompletionRate = completionRates.length > 0 
      ? Math.round(completionRates.reduce((a, b) => a + b, 0) / completionRates.length) 
      : 0;
    
    return {
      activeHabits,
      completedToday,
      currentStreak,
      averageCompletionRate,
      longestStreak: currentStreak, // For simplicity
    };
  };

  return (
    <HabitContext.Provider value={{
      habits,
      addHabit,
      toggleHabitCompletion,
      deleteHabit,
      editHabit,
      getTodayHabits,
      getStats
    }}>
      {children}
    </HabitContext.Provider>
  );
};

export const useHabits = () => {
  return useContext(HabitContext);
};

export default HabitContext; 