import { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'react-feather';
import { useTheme } from '../../context/ThemeContext';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { darkMode } = useTheme();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <motion.header 
      className="sticky top-0 z-50 backdrop-blur-md shadow-sm bg-dailydev-navy shadow-soft-dark"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.div 
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-dailydev-purple to-dailydev-blue flex items-center justify-center text-white font-bold text-xl">
            H
          </div>
          <span className="text-2xl font-bold text-white">
            HabitHub
          </span>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#dashboard" className="font-medium text-gray-200 hover:text-dailydev-purple transition-colors">Dashboard</a>
          <a href="#habits" className="font-medium text-gray-200 hover:text-dailydev-purple transition-colors">My Habits</a>
        </nav>
        
        <div className="flex items-center">
          <motion.button
            className="p-2 rounded-full hover:bg-dark-light text-gray-300 md:hidden"
            onClick={toggleMenu}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div 
          className="md:hidden bg-dailydev-navy shadow-lg rounded-b-xl shadow-soft-dark"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col p-4 gap-4">
            <a href="#dashboard" className="py-2 px-4 hover:bg-dark-light rounded-lg font-medium text-gray-200">Dashboard</a>
            <a href="#habits" className="py-2 px-4 hover:bg-dark-light rounded-lg font-medium text-gray-200">My Habits</a>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header; 