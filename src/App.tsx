import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import AddFoodForm from './components/AddFoodForm';
import FoodList from './components/FoodList';
import NotificationWindow from './components/NotificationWindow';
import BarcodeScanner from './components/BarcodeScanner';
import FAB from './components/FAB';
import { FoodItem, BarcodeData, Notification } from './types';

function App() {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [barcodeData, setBarcodeData] = useState<BarcodeData[]>([]);

  useEffect(() => {
    const storedItems = localStorage.getItem('foodItems');
    if (storedItems) {
      setFoodItems(JSON.parse(storedItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('foodItems', JSON.stringify(foodItems));
    checkExpirations();
  }, [foodItems]);

  const addFoodItem = (item: FoodItem) => {
    setFoodItems([...foodItems, item]);
    setShowAddForm(false);
  };

  const removeFoodItem = (id: string) => {
    setFoodItems(foodItems.filter(item => item.id !== id));
  };

  const checkExpirations = () => {
    const today = new Date();
    const newNotifications: Notification[] = [];

    foodItems.forEach(item => {
      const expirationDate = new Date(item.expirationDate);
      const daysUntilExpiration = Math.ceil((expirationDate.getTime() - today.getTime()) / (1000 * 3600 * 24));

      if (daysUntilExpiration <= 3 && daysUntilExpiration > 0) {
        newNotifications.push({
          message: `${item.name}の賞味期限まであと${daysUntilExpiration}日です。`,
          isExpired: false
        });
      } else if (daysUntilExpiration <= 0) {
        newNotifications.push({
          message: `${item.name}の賞味期限が切れています。`,
          isExpired: true
        });
      }
    });

    setNotifications(newNotifications);
  };

  const handleBarcodeScanned = (barcode: string) => {
    localStorage.setItem('lastScannedBarcode', barcode);
    setShowScanner(false);
    setShowAddForm(true);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-blue-600">食材期限管理アプリ</h1>
        
        <div className="mb-4 flex justify-end items-center">
          <button
            onClick={toggleNotifications}
            className="relative focus:outline-none"
          >
            <Bell size={24} className="text-blue-500" />
            {notifications.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {notifications.length}
              </span>
            )}
          </button>
        </div>

        {showAddForm && (
          <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ease-in-out" onClick={() => setShowAddForm(false)}></div>
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md transform transition-all duration-300 ease-in-out">
                <AddFoodForm
                  onAdd={addFoodItem}
                  onCancel={() => setShowAddForm(false)}
                  barcodeData={barcodeData}
                  setBarcodeData={setBarcodeData}
                  onScanClick={() => setShowScanner(true)}
                />
              </div>
            </div>
          </>
        )}

        {showScanner && (
          <BarcodeScanner onScan={handleBarcodeScanned} onClose={() => setShowScanner(false)} />
        )}

        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <FoodList items={foodItems} onRemove={removeFoodItem} />
        </div>

        {showNotifications && (
          <NotificationWindow
            notifications={notifications}
            onClose={() => setShowNotifications(false)}
          />
        )}
      </div>

      <FAB
        onAddClick={() => setShowAddForm(true)}
        onScanClick={() => setShowScanner(true)}
      />
    </div>
  );
}

export default App;