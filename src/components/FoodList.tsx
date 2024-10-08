import React from 'react';
import { Trash2 } from 'lucide-react';
import { FoodItem } from '../types';

interface FoodListProps {
  items: FoodItem[];
  onRemove: (id: string) => void;
}

const FoodList: React.FC<FoodListProps> = ({ items, onRemove }) => {
  const getStorageTypeColor = (storageType: string) => {
    switch (storageType) {
      case '冷蔵':
        return 'bg-blue-100 text-blue-800';
      case '冷凍':
        return 'bg-indigo-100 text-indigo-800';
      case '常温':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={item.id}
          className="flex items-center justify-between bg-white p-4 rounded-md shadow animate-fadeIn"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div>
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-sm text-gray-500">賞味期限: {new Date(item.expirationDate).toLocaleDateString('ja-JP')}</p>
            <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${getStorageTypeColor(item.storageType)}`}>
              {item.storageType}
            </span>
          </div>
          <button
            onClick={() => onRemove(item.id)}
            className="text-red-500 hover:text-red-700 focus:outline-none transition-colors duration-300"
          >
            <Trash2 size={20} />
          </button>
        </div>
      ))}
      {items.length === 0 && (
        <p className="text-center text-gray-500">食材がまだ登録されていません。</p>
      )}
    </div>
  );
};

export default FoodList;