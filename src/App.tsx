import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LoginPage } from './components/auth/LoginPage'
import { AppShell } from './components/layout/AppShell'
import { Dashboard } from './components/dashboard/Dashboard.tsx'
import { MembersPage } from './components/members/MembersPage.tsx'
import { NotificationsPage } from './components/notifications/NotificationsPage'
import { PaymentsPage } from './components/payments/PaymentsPage.tsx'
import { SchedulePage } from './components/schedule/SchedulePage.tsx'
import { AttendancePage } from './components/attendance/AttendancePage'
import { ProgressPage } from './components/progress/ProgressPage'
import { SettingsPage } from './components/settings/SettingsPage'
import { useGymData } from './hooks/useGymData'
import { getSession, login, logout } from './services/auth'
import './App.css'

function App() {
  const [user, setUser] = useState(getSession)
  const { data, error, isLoading, addMember, deleteMember, addPayment, addSession, updateSession, saveAttendance, addProgress, updateData, clearData } = useGymData()

  if (!user) return <LoginPage onLogin={(email, password) => { const nextUser = login(email, password); if (nextUser) { setUser(nextUser); return true } return false }} />

  if (isLoading) return <div className="state-screen"><div className="loading-mark">RS</div><p>Preparing your studio workspace...</p></div>
  if (error || !data) return <div className="state-screen"><h1>Something went wrong</h1><p>{error ?? 'No studio data available.'}</p></div>

  return <BrowserRouter><Routes><Route element={<AppShell user={user} onLogout={() => { logout(); setUser(null) }} />}><Route path="/" element={<Dashboard data={data} onAddMember={addMember} />} /><Route path="/members" element={<MembersPage data={data} onAddMember={addMember} onDeleteMember={deleteMember} onAddPayment={addPayment} />} /><Route path="/payments" element={<PaymentsPage data={data} onAddPayment={addPayment} />} /><Route path="/notifications" element={<NotificationsPage data={data} />} /><Route path="/schedule" element={<SchedulePage sessions={data.sessions ?? []} onAddSession={addSession} onUpdateSession={updateSession} />} /><Route path="/attendance" element={<AttendancePage members={data.members} records={data.attendance ?? []} onSave={saveAttendance} />} /><Route path="/progress" element={<ProgressPage members={data.members} records={data.progress ?? []} onAdd={addProgress} />} /><Route path="/settings" element={<SettingsPage data={data} onSave={updateData} onClearData={clearData} />} /><Route path="*" element={<div className="empty-page"><p className="eyebrow">Coming next</p><h1>This workspace is ready for your data.</h1><p>The navigation and service boundary are in place. This module will be connected to the same IndexedDB data layer next.</p></div>} /></Route></Routes></BrowserRouter>
}

export default App
