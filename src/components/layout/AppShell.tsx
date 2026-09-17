import { useState } from 'react'
import { Link, NavLink, Outlet, type NavLinkRenderProps } from 'react-router-dom'
import { FiActivity, FiBell, FiCalendar, FiCreditCard, FiGrid, FiLogOut, FiMenu, FiSettings, FiUsers, FiX } from 'react-icons/fi'
import type { AuthUser } from '../../services/auth'

const navigation = [
  { label: 'Overview', to: '/', icon: FiGrid },
  { label: 'Members', to: '/members', icon: FiUsers },
  { label: 'Payments', to: '/payments', icon: FiCreditCard },
  { label: 'Attendance', to: '/attendance', icon: FiCalendar },
  { label: 'Progress', to: '/progress', icon: FiActivity },
  { label: 'Settings', to: '/settings', icon: FiSettings },
]

interface AppShellProps { user: AuthUser; onLogout: () => void }

export function AppShell({ user, onLogout }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const linkClass = ({ isActive }: NavLinkRenderProps) => `nav-link ${isActive ? 'active' : ''}`
  return <div className="app-shell"><aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}><div className="brand"><div className="brand-mark">RS</div><div><strong>RS Womens Gym</strong><span>Studio management</span></div></div><div className="nav-label">Workspace</div><nav aria-label="Main navigation">{navigation.map(({ label, to, icon: Icon }) => <NavLink key={to} to={to} end={to === '/'} onClick={() => setSidebarOpen(false)} className={linkClass}><Icon aria-hidden="true" /><span>{label}</span></NavLink>)}<NavLink to="/notifications" onClick={() => setSidebarOpen(false)} className={linkClass}><FiBell /><span>Notifications</span></NavLink></nav><div className="sidebar-footer"><div className="studio-status"><span className="status-dot" />Studio open<span className="status-time">06:00 - 21:00</span></div><div className="user-card"><div className="avatar avatar-small">DG</div><div><strong>{user.name}</strong><span>{user.role}</span></div><button className="icon-button logout-button" aria-label="Log out" onClick={onLogout}><FiLogOut /></button></div></div></aside><div className="main-column"><header className="topbar"><button className="icon-button mobile-menu" aria-label={sidebarOpen ? 'Close menu' : 'Open menu'} onClick={() => setSidebarOpen(!sidebarOpen)}>{sidebarOpen ? <FiX /> : <FiMenu />}</button><div className="breadcrumb"><span>Workspace</span><b>/</b><strong>Overview</strong></div><div className="topbar-actions"><Link to="/notifications" className="icon-button notification-button" aria-label="View notifications"><FiBell /><i /></Link><div className="topbar-date">Thursday, 17 Sep 2026</div></div></header><main className="page-content"><Outlet /></main></div></div>
}
