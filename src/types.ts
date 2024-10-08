export type StorageType = '冷蔵' | '冷凍' | '常温';

export interface FoodItem {
  id: string;
  name: string;
  expirationDate: string;
  storageType: StorageType;
  barcode?: string;
}

export interface BarcodeData {
  barcode: string;
  name: string;
  storageType: StorageType;
}

export interface Notification {
  message: string;
  isExpired: boolean;
}