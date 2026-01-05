
export enum UserRole {
  INDIVIDUAL = 'INDIVIDUAL',
  COMPANY = 'COMPANY',
  SERVICE_PROVIDER = 'SERVICE_PROVIDER',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  role: UserRole;
  profilePhoto: string;
  balance: number;
  location: string;
  phone: string;
  isPremium: boolean;
  cards?: BankCard[];
}

export interface BankCard {
  id: string;
  type: 'virtual' | 'physical';
  number: string;
  expiry: string;
  cvv: string;
  status: 'active' | 'frozen' | 'ordered';
  brand: 'VISA' | 'MASTERCARD';
  color: 'gold' | 'black' | 'platinum';
}

export interface Task {
  id: string;
  title: string;
  description: string;
  reward: number;
  type: 'micro-task' | 'online' | 'offline';
  category: string;
  companyId: string;
  status: 'available' | 'ongoing' | 'completed';
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'transfer' | 'task_payment' | 'card_issuance' | 'investment';
  amount: number;
  date: string;
  status: 'pending' | 'success' | 'failed';
  description: string;
  category?: string;
}
