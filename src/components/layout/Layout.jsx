import { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import HabitForm from '../habits/HabitForm';
import { useHabits } from '../../context/HabitContext';

const Layout = ({ children }) => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [showHabitForm, setShowHabitForm] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { addHabit } = useHabits();
  
  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarVisible(false);
      } else {
        setSidebarVisible(true);
      }
    };
    
    checkMobile(); // Check on initial load
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const handleAddHabit = () => {
    setShowHabitForm(true);
  };

  const handleSaveHabit = (habitData) => {
    addHabit(habitData);
    setShowHabitForm(false);
  };
  
  const mainStyle = {
    transition: 'all 0.3s',
    marginLeft: sidebarVisible ? (isMobile ? '0' : '250px') : '0',
    paddingTop: '5rem', 
    padding: '1.5rem'
  };
  
  return (
    <div className="min-h-screen transition-colors duration-200 bg-dailydev-navy">
      <Header />
      {sidebarVisible && <Sidebar onAddHabit={handleAddHabit} />}
      <main style={mainStyle} className="sm:p-4 md:p-6">
        {children}
      </main>

      {showHabitForm && (
        <HabitForm 
          onClose={() => setShowHabitForm(false)} 
          onSave={handleSaveHabit}
        />
      )}
    </div>
  );
};

export default Layout; 