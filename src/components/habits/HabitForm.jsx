import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Check } from 'react-feather';

const HabitForm = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Productivity',
    frequency: 'daily',
    reminderTime: '',
    color: 'indigo',
    icon: '📝',
  });
  
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  
  const categories = [
    'Productivity', 'Health', 'Fitness', 'Nutrition', 
    'Mindfulness', 'Learning', 'Finance', 'Social'
  ];
  
  const frequencies = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'custom', label: 'Custom' },
  ];
  
  const colorOptions = [
    { name: 'indigo', value: '#6366F1' },
    { name: 'emerald', value: '#10B981' },
    { name: 'amber', value: '#F59E0B' },
    { name: 'rose', value: '#F43F5E' },
    { name: 'blue', value: '#3B82F6' },
    { name: 'violet', value: '#8B5CF6' },
  ];
  
  const iconOptions = ['📝', '💪', '🏃‍♂️', '🧘‍♂️', '💻', '📚', '💤', '💧', '🥗', '❤️', '🌱', '📊'];
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectColor = (color) => {
    setFormData(prev => ({ ...prev, color }));
  };
  
  const handleSelectIcon = (icon) => {
    setFormData(prev => ({ ...prev, icon }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      return;
    }
    
    onSave(formData);
    onClose();
  };
  
  const goToPreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };
  
  const renderFormStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <h2 className="text-xl font-bold mb-6 text-white">Create New Habit</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Habit Name</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="input w-full"
                  placeholder="E.g., Morning Meditation"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Description (Optional)</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="input w-full min-h-[80px]"
                  placeholder="Describe your habit..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="input w-full"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </>
        );
        
      case 2:
        return (
          <>
            <h2 className="text-xl font-bold mb-6 text-white">Customize Your Habit</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Select Color</label>
                <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                  {colorOptions.map(({ name, value }) => (
                    <button
                      key={name}
                      type="button"
                      className={`w-10 h-10 rounded-full transition-all ${formData.color === name ? 'ring-2 ring-offset-2 ring-dailydev-purple scale-110' : ''}`}
                      style={{ backgroundColor: value }}
                      onClick={() => handleSelectColor(name)}
                    />
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Choose Icon</label>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {iconOptions.map(icon => (
                    <button
                      key={icon}
                      type="button"
                      className={`flex items-center justify-center w-12 h-12 rounded-lg text-xl transition-all ${
                        formData.icon === icon 
                          ? 'bg-dailydev-purple/20 ring-2 ring-dailydev-purple' 
                          : 'bg-dark-light hover:bg-dark-lighter'
                      }`}
                      onClick={() => handleSelectIcon(icon)}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        );
        
      case 3:
        return (
          <>
            <h2 className="text-xl font-bold mb-6 text-white">Schedule Your Habit</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Frequency</label>
                <div className="grid grid-cols-3 gap-2">
                  {frequencies.map(({ value, label }) => (
                    <button
                      key={value}
                      type="button"
                      className={`py-2 px-4 rounded-lg transition-all ${
                        formData.frequency === value 
                          ? 'bg-dailydev-purple text-white' 
                          : 'bg-dark-light text-gray-300 hover:bg-dark-lighter'
                      }`}
                      onClick={() => setFormData(prev => ({ ...prev, frequency: value }))}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Reminder (Optional)</label>
                <input
                  type="time"
                  name="reminderTime"
                  value={formData.reminderTime}
                  onChange={handleChange}
                  className="input w-full"
                />
              </div>
              
              <div className="bg-dark-light p-4 rounded-lg border border-dark-lighter mt-6">
                <h3 className="font-medium text-white mb-2">Habit Summary</h3>
                <div className="flex items-center mb-3">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-lg mr-3 text-white`} style={{ backgroundColor: colorOptions.find(c => c.name === formData.color)?.value }}>
                    <span>{formData.icon}</span>
                  </div>
                  <div>
                    <p className="font-bold text-white">{formData.title || "New Habit"}</p>
                    <p className="text-sm text-gray-400">{formData.category}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-300 mb-2">{formData.description || "No description"}</p>
                <p className="text-sm text-gray-300"><span className="font-medium">Frequency:</span> {formData.frequency}</p>
              </div>
            </div>
          </>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-dailydev-darkBlue rounded-xl shadow-xl w-full max-w-md"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 relative">
          <button
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-dark-light transition-colors text-gray-400"
            onClick={onClose}
          >
            <X size={20} />
          </button>
          
          <form onSubmit={handleSubmit}>
            {renderFormStep()}
            
            <div className="flex justify-between mt-8">
              {currentStep > 1 ? (
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={goToPreviousStep}
                >
                  Back
                </button>
              ) : (
                <div></div>
              )}
              
              <button
                type="submit"
                className="btn btn-primary flex items-center gap-2"
              >
                {currentStep === totalSteps ? 'Create Habit' : 'Next'}
                {currentStep === totalSteps && <Check size={18} />}
              </button>
            </div>
            
            <div className="flex justify-center mt-6">
              <div className="flex space-x-2">
                {Array.from({ length: totalSteps }).map((_, index) => (
                  <div 
                    key={index}
                    className={`w-2 h-2 rounded-full ${currentStep > index ? 'bg-dailydev-purple' : 'bg-gray-500'}`}
                  ></div>
                ))}
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HabitForm; 