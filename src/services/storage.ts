import type { DashboardData } from '../types'

const databaseName = 'rs-women-gym'
const storeName = 'dashboard'
const dataKey = 'current'

const seedData: DashboardData = {
  members: [],
  payments: [],
  attendanceToday: 0,
  monthlyRevenue: 0,
  expensesThisMonth: 0,
  sessions: [],
  attendance: [],
  progress: [],
  gymName: 'RS Womens Gym',
  gymPhone: '7075812823',
  gymAddress: 'Opp to Bus Stand, Mancherial 504208',
}

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(databaseName, 1)
    request.onupgradeneeded = () => request.result.createObjectStore(storeName)
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error ?? new Error('Unable to open local database'))
  })
}

export async function getDashboardData(): Promise<DashboardData> {
  if (!('indexedDB' in window)) return seedData
  const database = await openDatabase()
  return new Promise((resolve, reject) => {
    const request = database.transaction(storeName, 'readonly').objectStore(storeName).get(dataKey)
    request.onsuccess = () => {
      const stored = request.result as DashboardData | undefined
      if (!stored) {
        resolve(seedData)
        return
      }

      const demoMemberIds = new Set(['1', '2', '3', '4', '5'])
      const members = stored.members.filter((member) => !demoMemberIds.has(member.id) && !member.email.endsWith('@example.com'))
      const payments = stored.payments.filter((payment) => !['p1', 'p2', 'p3'].includes(payment.id))
      const attendance = (stored.attendance ?? []).filter((record) => !demoMemberIds.has(record.memberId))
      const progress = (stored.progress ?? []).filter((record) => !demoMemberIds.has(record.memberId))
      const sessions = (stored.sessions ?? []).filter((session) => !['morning-strength', 'yoga-flow', 'hiit-circuit'].includes(session.id))
      const hadDemoPayments = payments.length !== stored.payments.length
      resolve({ ...seedData, ...stored, members, payments, attendance, progress, sessions, monthlyRevenue: hadDemoPayments ? payments.reduce((sum, payment) => sum + payment.amount, 0) : stored.monthlyRevenue, attendanceToday: attendance.filter((record) => record.date === new Date().toISOString().slice(0, 10) && record.status === 'Present').length, gymName: !stored.gymName || stored.gymName === 'RS Women Gym' ? seedData.gymName : stored.gymName, gymPhone: !stored.gymPhone || stored.gymPhone === '+91 98765 00000' ? seedData.gymPhone : stored.gymPhone, gymAddress: !stored.gymAddress || stored.gymAddress === 'Banjara Hills, Hyderabad' ? seedData.gymAddress : stored.gymAddress })
    }
    request.onerror = () => reject(request.error ?? new Error('Unable to read dashboard data'))
  })
}

export async function saveDashboardData(data: DashboardData): Promise<void> {
  if (!('indexedDB' in window)) return
  const database = await openDatabase()
  return new Promise((resolve, reject) => {
    const request = database.transaction(storeName, 'readwrite').objectStore(storeName).put(data, dataKey)
    request.onsuccess = () => resolve()
    request.onerror = () => reject(request.error ?? new Error('Unable to save dashboard data'))
  })
}

export async function clearDashboardData(): Promise<void> {
  await saveDashboardData(seedData)
}
