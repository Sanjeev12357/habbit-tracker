import { motion } from 'framer-motion';
import { Circle, CheckCircle, MoreVertical, Award, TrendingUp, Trash2, Edit } from 'react-feather';
import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useHabits } from '../../context/HabitContext';

const HabitCard = ({ habit }) => {
  const confettiRef = useRef(null);
  const { toggleHabitCompletion, deleteHabit } = useHabits();
  const [showMenu, setShowMenu] = useState(false);
  
  const {
    id,
    title,
    description,
    streakCount,
    completionRate,
    category,
    color,
    isCompleted,
    icon,
  } = habit;

  const colorVariants = {
    indigo: 'from-indigo-600 to-indigo-800',
    emerald: 'from-emerald-600 to-emerald-800',
    amber: 'from-amber-600 to-amber-800',
    rose: 'from-rose-600 to-rose-800',
    blue: 'from-blue-600 to-blue-800',
    violet: 'from-violet-600 to-violet-800',
  };

  const gradientColor = colorVariants[color] || colorVariants.indigo;

  const handleComplete = () => {
    toggleHabitCompletion(id);
    
    // Only animate confetti when completing a habit
    if (!isCompleted && confettiRef.current) {
      // Place confetti at button position
      gsap.set(confettiRef.current.children, { 
        y: 0, 
        opacity: 0,
        scale: 0,
        x: (i) => (Math.random() - 0.5) * 20
      });
      
      // Animate confetti
      gsap.to(confettiRef.current.children, {
        y: -100,
        x: (i) => (Math.random() - 0.5) * 100,
        opacity: (i) => gsap.utils.random(0.5, 1),
        scale: (i) => gsap.utils.random(0.5, 1.5),
        duration: 0.8,
        stagger: 0.02,
        ease: 'power2.out',
        onComplete: () => {
          gsap.to(confettiRef.current.children, {
            y: 100,
            opacity: 0,
            duration: 0.5,
            stagger: 0.01,
            delay: 0.3
          });
        }
      });
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteHabit(id);
    setShowMenu(false);
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  return (
    <motion.div 
      className="habit-card relative overflow-hidden"
      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Card Header with Gradient */}
      <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${gradientColor}`}></div>
      
      <div className="flex justify-between">
        <div className="flex items-center space-x-3">
          <div className={`flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br ${gradientColor} text-white shadow-sm`}>
            <span>{icon}</span>
          </div>
          <div>
            <h3 className="font-bold text-white">{title}</h3>
            <p className="text-sm text-gray-300">{category}</p>
          </div>
        </div>
        <div className="relative">
          <button 
            className="p-1 rounded-full hover:bg-dailydev-purple/20 transition-colors"
            onClick={toggleMenu}
          >
            <MoreVertical size={18} className="text-gray-300" />
          </button>
          
          {/* Dropdown Menu */}
          {showMenu && (
            <div className="absolute right-0 mt-2 w-36 bg-dailydev-darkBlue rounded-lg shadow-lg overflow-hidden z-10 border border-dailydev-darkCard">
              <button
                className="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-dailydev-darkCard flex items-center gap-2"
                onClick={handleDelete}
              >
                <Trash2 size={14} className="text-red-500" />
                <span>Delete</span>
              </button>
              <button
                className="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-dailydev-darkCard flex items-center gap-2"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu(false);
                }}
              >
                <Edit size={14} className="text-dailydev-blue" />
                <span>Edit</span>
              </button>
            </div>
          )}
        </div>
      </div>
      
      <p className="mt-3 text-sm text-gray-300">{description}</p>
      
      {/* Stats */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <TrendingUp size={16} className="text-dailydev-purple" />
          <div>
            <p className="text-xs text-gray-400">Completion Rate</p>
            <p className="font-medium text-white">{completionRate}%</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Award size={16} className="text-amber-400" />
          <div>
            <p className="text-xs text-gray-400">Current Streak</p>
            <p className="font-medium text-white">{streakCount} days</p>
          </div>
        </div>
      </div>
      
      {/* Action Button */}
      <div className="mt-5 flex justify-between items-center">
        <motion.button
          className={`flex items-center space-x-2 py-2 px-4 rounded-lg transition-colors ${
            isCompleted 
              ? 'bg-green-900/30 text-green-400' 
              : 'bg-dailydev-navy/50 text-gray-200 hover:bg-dailydev-purple hover:text-white'
          }`}
          onClick={handleComplete}
          whileTap={{ scale: 0.95 }}
        >
          {isCompleted ? (
            <>
              <CheckCircle size={18} />
              <span>Completed</span>
            </>
          ) : (
            <>
              <Circle size={18} />
              <span>Mark Complete</span>
            </>
          )}
        </motion.button>
        
        <p className="text-xs text-gray-300">Today</p>
      </div>
      
      {/* Hidden confetti container for animation */}
      <div ref={confettiRef} className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <div 
            key={i}
            className={`absolute w-2 h-2 rounded-full opacity-0`}
            style={{
              backgroundColor: ['#8B5CF6', '#34D399', '#F59E0B', '#EC4899', '#3B82F6'][i % 5],
              left: '50%',
              top: '70%',
            }}
          ></div>
        ))}
      </div>
    </motion.div>
  );
};

export default HabitCard; 