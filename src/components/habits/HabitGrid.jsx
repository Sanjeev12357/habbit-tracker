import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HabitCard from './HabitCard';
import HabitForm from './HabitForm';
import { Plus, Search, Filter, X } from 'react-feather';
import { useHabits } from '../../context/HabitContext';
import { useTheme } from '../../context/ThemeContext';

const HabitGrid = () => {
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { habits, addHabit } = useHabits();
  const { darkMode } = useTheme();
  
  // Get unique categories from habits
  const uniqueCategories = ['All', ...new Set(habits.map(habit => habit.category))];
  
  const filteredHabits = habits.filter(habit => {
    // Filter by search query
    const matchesQuery = habit.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          habit.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by category
    const matchesCategory = selectedCategory === 'All' || habit.category === selectedCategory;
    
    return matchesQuery && matchesCategory;
  });
  
  const handleSaveHabit = (habitData) => {
    addHabit(habitData);
    setShowForm(false);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };
  
  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-6 text-white">My Habits</h1>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="relative w-full md:w-96">
            
            <input
              type="text"
              placeholder="    Search habits..."
              className="input w-full  pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 z-10"
                onClick={clearSearch}
              >
                <X size={16} />
              </button>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <div className="relative min-w-[180px]">
              <select
                className="input w-full appearance-none pr-10"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {uniqueCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <Filter size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            
            <motion.button
              className="btn btn-primary flex items-center justify-center gap-2"
              onClick={() => setShowForm(true)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Plus size={20} />
              <span className="md:inline">Add Habit</span>
            </motion.button>
          </div>
        </div>
        
        {filteredHabits.length === 0 ? (
          <div className="text-center py-10 card">
            <div className="mb-3 text-gray-400 text-4xl">🔍</div>
            <h3 className="text-xl font-medium mb-1">No habits found</h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
            {searchQuery && (
              <motion.button
                className="mt-4 btn btn-outline"
                onClick={clearSearch}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Clear Search
              </motion.button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredHabits.map(habit => (
                <motion.div
                  key={habit.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <HabitCard habit={habit} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
      
      <AnimatePresence>
        {showForm && (
          <HabitForm 
            onClose={() => setShowForm(false)} 
            onSave={handleSaveHabit}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default HabitGrid; 