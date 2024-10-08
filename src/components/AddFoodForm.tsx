import React, { useState, useEffect } from 'react';
import { FoodItem, StorageType, BarcodeData } from '../types';
import { Barcode } from 'lucide-react';

interface AddFoodFormProps {
  onAdd: (item: FoodItem) => void;
  onCancel: () => void;
  barcodeData: BarcodeData[];
  setBarcodeData: React.Dispatch<React.SetStateAction<BarcodeData[]>>;
  onScanClick: () => void;
}

const AddFoodForm: React.FC<AddFoodFormProps> = ({ onAdd, onCancel, barcodeData, setBarcodeData, onScanClick }) => {
  const [name, setName] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [storageType, setStorageType] = useState<StorageType>('冷蔵');
  const [barcode, setBarcode] = useState('');

  useEffect(() => {
    const lastScannedBarcode = localStorage.getItem('lastScannedBarcode');
    if (lastScannedBarcode) {
      const existingData = barcodeData.find(data => data.barcode === lastScannedBarcode);
      if (existingData) {
        setName(existingData.name);
        setStorageType(existingData.storageType);
      }
      setBarcode(lastScannedBarcode);
      localStorage.removeItem('lastScannedBarcode');
    }
  }, [barcodeData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && expirationDate && storageType) {
      const newItem: FoodItem = {
        id: Date.now().toString(),
        name,
        expirationDate,
        storageType,
        barcode: barcode || undefined,
      };
      onAdd(newItem);

      if (barcode && !barcodeData.some(data => data.barcode === barcode)) {
        const newBarcodeData: BarcodeData = {
          barcode,
          name,
          storageType,
        };
        setBarcodeData([...barcodeData, newBarcodeData]);
      }

      setName('');
      setExpirationDate('');
      setStorageType('冷蔵');
      setBarcode('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          食材名
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700 mb-1">
          賞味期限
        </label>
        <input
          type="date"
          id="expirationDate"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label htmlFor="storageType" className="block text-sm font-medium text-gray-700 mb-1">
          保存方法
        </label>
        <select
          id="storageType"
          value={storageType}
          onChange={(e) => setStorageType(e.target.value as StorageType)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="冷蔵">冷蔵</option>
          <option value="冷凍">冷凍</option>
          <option value="常温">常温</option>
        </select>
      </div>
      <div>
        <label htmlFor="barcode" className="block text-sm font-medium text-gray-700 mb-1">
          バーコード (オプション)
        </label>
        <div className="flex items-center">
          <input
            type="text"
            id="barcode"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={onScanClick}
            className="px-3 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Barcode size={20} />
          </button>
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          キャンセル
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          追加
        </button>
      </div>
    </form>
  );
};

export default AddFoodForm;