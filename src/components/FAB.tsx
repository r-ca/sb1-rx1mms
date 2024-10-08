import React, { useState } from 'react';
import { Plus, Barcode } from 'lucide-react';

interface FABProps {
  onAddClick: () => void;
  onScanClick: () => void;
}

const FAB: React.FC<FABProps> = ({ onAddClick, onScanClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-6 right-6">
      {isOpen && (
        <div className="mb-4 flex flex-col items-end space-y-4">
          <button
            onClick={() => {
              onScanClick();
              toggleMenu();
            }}
            className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 hover:scale-110"
          >
            <Barcode size={24} />
          </button>
          <button
            onClick={() => {
              onAddClick();
              toggleMenu();
            }}
            className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300 hover:scale-110"
          >
            <Plus size={24} />
          </button>
        </div>
      )}
      <button
        onClick={toggleMenu}
        className="bg-indigo-500 text-white p-4 rounded-full shadow-lg hover:bg-indigo-600 transition-all duration-300 hover:scale-110"
      >
        <Plus size={24} className={`transform transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} />
      </button>
    </div>
  );
};

export default FAB;