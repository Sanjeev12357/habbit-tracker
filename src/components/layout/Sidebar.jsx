import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, Calendar, Plus, ChevronRight } from 'react-feather';
import { useHabits } from '../../context/HabitContext';

const Sidebar = ({ onAddHabit }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeLink, setActiveLink] = useState('dashboard');
  const { getStats } = useHabits();
  const stats = getStats();
  
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'dashboard';
      setActiveLink(hash);
    };
    
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Check on initial load
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const menuItems = [
    { icon: <Home size={20} />, label: 'Dashboard', link: '#dashboard', count: stats.activeHabits },
    { icon: <Calendar size={20} />, label: 'Habits', link: '#habits', count: stats.completedToday },
  ];

  return (
    <motion.div 
      className="h-screen fixed left-0 top-0 pt-20 z-40 bg-dailydev-navy shadow-lg shadow-soft-dark"
      initial={{ width: isCollapsed ? 70 : 250 }}
      animate={{ width: isCollapsed ? 70 : 250 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className="flex flex-col h-full">
        <motion.button
          className="absolute -right-3 top-24 bg-dailydev-purple rounded-full p-1 shadow-md border border-dailydev-purple/50"
          onClick={toggleSidebar}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{ rotate: isCollapsed ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronRight size={18} className="text-white" />
        </motion.button>

        <div className="flex-1 overflow-y-auto py-6 px-3">
          <ul className="space-y-2">
            {menuItems.map((item, index) => {
              const isActive = activeLink === item.link.replace('#', '');
              return (
                <motion.li key={index}
                  whileHover={{ x: 5 }}
                  className="overflow-hidden"
                >
                  <a href={item.link} 
                     className={`flex items-center p-3 rounded-lg transition-all group ${
                       isActive 
                       ? 'bg-dailydev-purple/30 text-dailydev-purple' 
                       : 'text-gray-300 hover:bg-dailydev-purple/20 hover:text-dailydev-purple'
                     } ${isCollapsed ? 'justify-center' : ''}`}
                  >
                    <motion.span className={`transition-colors ${isActive ? 'text-dailydev-purple' : 'text-gray-400 group-hover:text-dailydev-purple'}`}>
                      {item.icon}
                    </motion.span>
                    {!isCollapsed && (
                      <div className="flex justify-between items-center w-full">
                        <motion.span 
                          className="ml-3 font-medium"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {item.label}
                        </motion.span>
                        {item.count !== undefined && (
                          <motion.span 
                            className="px-2 py-1 text-xs bg-dailydev-purple/20 text-gray-200 rounded-full"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                          >
                            {item.count}
                          </motion.span>
                        )}
                      </div>
                    )}
                  </a>
                </motion.li>
              );
            })}
          </ul>
        </div>

        <div className="p-4 mt-auto">
          <motion.button
            className={`flex items-center ${isCollapsed ? 'justify-center' : ''} w-full p-3 rounded-lg bg-gradient-to-r from-dailydev-purple to-dailydev-blue text-white font-medium shadow-md hover:shadow-lg transition-all`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onAddHabit}
          >
            <Plus size={20} />
            {!isCollapsed && <span className="ml-2">New Habit</span>}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar; 