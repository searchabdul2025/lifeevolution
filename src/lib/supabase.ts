import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface User {
  id: string
  email: string
  name: string
  role: 'super_admin' | 'admin' | 'editor' | 'viewer' | 'member' | 'agent' | 'affiliate'
  status: 'active' | 'pending' | 'inactive'
  created_at: string
  updated_at: string
}

export interface Policy {
  id: string
  user_id: string
  type: string
  coverage: string
  premium: string
  status: 'active' | 'inactive' | 'pending'
  next_payment: string
  documents: number
  created_at: string
  updated_at: string
}

export interface Quote {
  id: string
  user_id: string
  insurance_type: string
  coverage_amount: string
  status: 'pending' | 'approved' | 'rejected' | 'in_review'
  estimated_premium: string
  submitted_date: string
  created_at: string
  updated_at: string
}

export interface Transaction {
  id: string
  user_id: string
  amount: number
  status: 'completed' | 'pending' | 'failed'
  method: string
  description: string
  date: string
  created_at: string
}

export interface SupportTicket {
  id: string
  user_id: string
  user_type: 'member' | 'agent' | 'affiliate'
  subject: string
  category: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'open' | 'in_progress' | 'resolved' | 'closed'
  description: string
  assigned_to?: string
  created_at: string
  updated_at: string
}

export interface Affiliate {
  id: string
  user_id: string
  code: string
  commission_rate: number
  total_earnings: number
  referrals: number
  status: 'active' | 'inactive'
  created_at: string
}

export interface Lead {
  id: string
  agent_id: string
  name: string
  email: string
  phone: string
  status: 'hot' | 'warm' | 'cold'
  value: string
  probability: number
  created_at: string
  updated_at: string
}
