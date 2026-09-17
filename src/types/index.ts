export type MembershipStatus = 'Active' | 'Expiring soon' | 'Expired'
export type PaymentMethod = 'UPI' | 'Cash' | 'Card' | 'Bank transfer'
export type GymPlan = 'General' | 'Personal'
export type PaymentStatus = 'Paid in full' | 'Partially paid' | 'Due'
export type SessionState = 'Upcoming' | 'Completed'

export interface Member {
  id: string
  name: string
  phone: string
  email: string
  plan: GymPlan | string
  joinedAt: string
  expiresAt: string
  paidMonths?: number
  monthlyFee?: number
  amountPaid?: number
  paymentStatus?: PaymentStatus
  status: MembershipStatus
  amountDue: number
  initials: string
  accent: string
}

export interface Payment {
  id: string
  memberId?: string
  memberName: string
  amount: number
  method: PaymentMethod
  paidAtDate?: string
  paidAt: string
  receiptNumber: string
}

export interface StudioSession {
  id: string
  time: string
  title: string
  trainer: string
  members: number
  tone: string
  state: SessionState
}

export interface AttendanceRecord {
  id: string
  memberId: string
  memberName: string
  date: string
  status: 'Present' | 'Absent'
}

export interface ProgressRecord {
  id: string
  memberId: string
  memberName: string
  date: string
  weight: number
  goal: string
  note: string
}

export interface DashboardData {
  members: Member[]
  payments: Payment[]
  attendanceToday: number
  monthlyRevenue: number
  expensesThisMonth: number
  sessions?: StudioSession[]
  attendance?: AttendanceRecord[]
  progress?: ProgressRecord[]
  gymName?: string
  gymPhone?: string
  gymAddress?: string
}
