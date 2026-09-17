import { useEffect, useState } from 'react'
import { clearDashboardData, getDashboardData, saveDashboardData } from '../services/storage'
import type { AttendanceRecord, DashboardData, Member, Payment, ProgressRecord, StudioSession } from '../types'

export function useGymData() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getDashboardData().then(setData).catch(() => setError('We could not load your local gym data.'))
  }, [])

  async function addMember(member: Member): Promise<void> {
    if (!data) return
    const nextData = { ...data, members: [member, ...data.members] }
    await saveDashboardData(nextData)
    setData(nextData)
  }

  async function deleteMember(memberId: string): Promise<void> {
    await updateData((current) => ({
      ...current,
      members: current.members.filter((member) => member.id !== memberId),
      attendance: (current.attendance ?? []).filter((record) => record.memberId !== memberId),
      progress: (current.progress ?? []).filter((record) => record.memberId !== memberId),
    }))
  }

  async function addPayment(payment: Payment): Promise<void> {
    if (!data) return
    const nextData = {
      ...data,
      members: data.members.map((member) => {
        const matchesMember = payment.memberId ? member.id === payment.memberId : member.name === payment.memberName
        if (!matchesMember) return member
        const amountPaid = (member.amountPaid ?? 0) + payment.amount
        const amountDue = Math.max(member.amountDue - payment.amount, 0)
        return { ...member, amountPaid, amountDue, paymentStatus: amountDue === 0 ? 'Paid in full' as const : amountPaid > 0 ? 'Partially paid' as const : 'Due' as const }
      }),
      payments: [payment, ...data.payments],
      monthlyRevenue: data.monthlyRevenue + payment.amount,
    }
    await saveDashboardData(nextData)
    setData(nextData)
  }

  async function updateData(update: (current: DashboardData) => DashboardData): Promise<void> {
    if (!data) return
    const nextData = update(data)
    await saveDashboardData(nextData)
    setData(nextData)
  }

  async function addSession(session: StudioSession) { await updateData((current) => ({ ...current, sessions: [...(current.sessions ?? []), session] })) }
  async function updateSession(sessionId: string) { await updateData((current) => ({ ...current, sessions: (current.sessions ?? []).map((session) => session.id === sessionId ? { ...session, state: session.state === 'Completed' ? 'Upcoming' : 'Completed' } : session) })) }
  async function saveAttendance(record: AttendanceRecord) { await updateData((current) => ({ ...current, attendance: [...(current.attendance ?? []).filter((item) => item.id !== record.id), record], attendanceToday: [...(current.attendance ?? []).filter((item) => item.date === record.date && item.status === 'Present' && item.id !== record.id), record].filter((item) => item.status === 'Present').length })) }
  async function addProgress(record: ProgressRecord) { await updateData((current) => ({ ...current, progress: [record, ...(current.progress ?? [])] })) }
  async function clearData() { await clearDashboardData(); setData(await getDashboardData()) }

  return { data, error, isLoading: data === null && error === null, addMember, deleteMember, addPayment, addSession, updateSession, saveAttendance, addProgress, updateData, clearData }
}
