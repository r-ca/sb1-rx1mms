import React from 'react';
import { useZxing } from 'react-zxing';

interface BarcodeScannerProps {
  onScan: (barcode: string) => void;
  onClose: () => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onScan, onClose }) => {
  const { ref } = useZxing({
    onResult(result) {
      onScan(result.getText());
    },
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-4">バーコードをスキャン</h2>
        <video ref={ref} className="w-full max-w-md" />
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          閉じる
        </button>
      </div>
    </div>
  );
};

export default BarcodeScanner;