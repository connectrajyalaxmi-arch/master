import { useMemo, useState } from 'react'
import { FiDollarSign, FiMail, FiPhone, FiSearch, FiTrash2, FiUserPlus } from 'react-icons/fi'
import { AddMemberModal } from './AddMemberModal.tsx'
import { RecordPaymentModal } from '../payments/RecordPaymentModal.tsx'
import type { DashboardData, Member, Payment } from '../../types'

interface MembersPageProps { data: DashboardData; onAddMember: (member: Member) => Promise<void>; onDeleteMember: (memberId: string) => Promise<void>; onAddPayment: (payment: Payment) => Promise<void> }

export function MembersPage({ data, onAddMember, onDeleteMember, onAddPayment }: MembersPageProps) {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All')
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [payingMember, setPayingMember] = useState<Member | null>(null)
  const members = useMemo(() => data.members.filter((member) => `${member.name} ${member.email} ${member.phone}`.toLowerCase().includes(query.toLowerCase()) && (status === 'All' || member.status === status)), [data.members, query, status])

  async function removeMember(member: Member) {
    if (!window.confirm(`Delete ${member.name}? Their attendance and progress history will also be removed. Payment history will stay for accounting.`)) return
    setDeletingId(member.id)
    await onDeleteMember(member.id)
    setDeletingId(null)
  }

  return <div className="feature-page"><section className="page-heading"><div><p className="eyebrow">Member directory</p><h1>Members</h1><p className="heading-copy">Manage plans, payment coverage and membership health.</p></div><button className="primary-button" onClick={() => setIsAddOpen(true)}><FiUserPlus /> Add member</button></section><section className="panel members-panel"><div className="members-toolbar"><div className="search-box"><FiSearch /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search members" aria-label="Search members" /></div><select value={status} onChange={(event) => setStatus(event.target.value)} aria-label="Filter by membership status"><option>All</option><option>Active</option><option>Expiring soon</option><option>Expired</option></select><span className="result-count">{members.length} members</span></div><div className="member-table"><div className="member-table-head"><span>Member</span><span>Plan</span><span>Joined / paid</span><span>Ends</span><span>Payment</span><span>Due</span><span>Contact</span><span>Manage</span></div>{members.map((member) => <div className="member-table-row" key={member.id}><div className="member-identity"><div className="avatar">{member.initials}</div><div><strong>{member.name}</strong><span>{member.email}</span></div></div><span>{member.plan}</span><span>{new Date(member.joinedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })} · {member.paidMonths ?? '—'} mo</span><span>{new Date(member.expiresAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span><span className={`payment-status ${member.paymentStatus === 'Paid in full' ? 'paid' : member.paymentStatus === 'Partially paid' ? 'partial' : 'due'}`}>{member.paymentStatus ?? (member.amountDue === 0 ? 'Paid in full' : 'Due')}</span><strong>{member.amountDue ? `₹${member.amountDue.toLocaleString('en-IN')}` : '—'}</strong><div className="member-contact"><a href={`tel:${member.phone}`} aria-label={`Call ${member.name}`}><FiPhone /></a><a href={`mailto:${member.email}`} aria-label={`Email ${member.name}`}><FiMail /></a></div><div className="member-actions">{member.amountDue > 0 && <button className="receive-payment-button" onClick={() => setPayingMember(member)} aria-label={`Receive payment from ${member.name}`} title="Receive payment"><FiDollarSign /></button>}<button className="delete-member-button" disabled={deletingId === member.id} onClick={() => void removeMember(member)} aria-label={`Delete ${member.name}`} title="Delete member"><FiTrash2 /></button></div></div>)}{members.length === 0 && <div className="empty-state"><FiSearch /><h2>No members found</h2><p>Try a different search or add a new member.</p></div>}</div></section>{isAddOpen && <AddMemberModal onClose={() => setIsAddOpen(false)} onSave={onAddMember} />}{payingMember && <RecordPaymentModal members={[payingMember]} onClose={() => setPayingMember(null)} onSave={onAddPayment} />}</div>
}
