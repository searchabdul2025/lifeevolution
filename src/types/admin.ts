export type UserRole = 'super_admin' | 'admin' | 'manager' | 'editor' | 'viewer';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: 'Active' | 'Pending' | 'Inactive';
  joined: string;
  plan: string;
  permissions: string[];
}

export interface PaymentTransaction {
  id: string;
  user: string;
  amount: number;
  status: 'Completed' | 'Pending' | 'Failed' | 'Refunded';
  method: string;
  date: string;
  description: string;
}

export interface Affiliate {
  id: string;
  name: string;
  email: string;
  code: string;
  commission: number;
  totalEarnings: number;
  referrals: number;
  status: 'Active' | 'Inactive';
  joinedDate: string;
}

export interface Career {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  status: 'Open' | 'Closed';
  applicants: number;
  postedDate: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  date: string;
  read: boolean;
}

export interface Template {
  id: string;
  name: string;
  type: 'email' | 'sms' | 'whatsapp';
  subject?: string;
  content: string;
  lastModified: string;
}
