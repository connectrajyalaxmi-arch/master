import { useState } from 'react'
import type { FormEvent } from 'react'
import { FiX } from 'react-icons/fi'
import type { GymPlan, Member } from '../../types'

interface AddMemberModalProps { onClose: () => void; onSave: (member: Member) => Promise<void> }
const planRates: Record<GymPlan, number> = { General: 2000, Personal: 5000 }

function addMonths(dateValue: string, months: number) {
  const date = new Date(`${dateValue}T00:00:00`)
  date.setMonth(date.getMonth() + months)
  return date.toISOString().slice(0, 10)
}

export function AddMemberModal({ onClose, onSave }: AddMemberModalProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [plan, setPlan] = useState<GymPlan>('General')
  const [joinedAt, setJoinedAt] = useState(new Date().toISOString().slice(0, 10))
  const [paidMonths, setPaidMonths] = useState('1')
  const [monthlyFee, setMonthlyFee] = useState(String(planRates.General))
  const [amountPaid, setAmountPaid] = useState('0')
  const [saving, setSaving] = useState(false)
  const expectedAmount = Number(monthlyFee) * Number(paidMonths)
  const amountDue = Math.max(expectedAmount - (Number(amountPaid) || 0), 0)

  function changePlan(nextPlan: GymPlan) {
    setPlan(nextPlan)
    setMonthlyFee(String(planRates[nextPlan]))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    const paid = Number(amountPaid) || 0
    const initials = name.split(' ').filter(Boolean).slice(0, 2).map((part) => part[0].toUpperCase()).join('')
    await onSave({ id: crypto.randomUUID(), name: name.trim(), phone: phone.trim(), email: email.trim(), plan, joinedAt, expiresAt: addMonths(joinedAt, Number(paidMonths)), paidMonths: Number(paidMonths), monthlyFee: Number(monthlyFee) || 0, amountPaid: paid, paymentStatus: amountDue === 0 ? 'Paid in full' : paid > 0 ? 'Partially paid' : 'Due', amountDue, status: 'Active', initials, accent: 'coral' })
    setSaving(false)
    onClose()
  }

  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) onClose() }}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="add-member-title"><div className="modal-heading"><div><p className="eyebrow">Member directory</p><h2 id="add-member-title">Add a new member</h2></div><button className="icon-button" type="button" aria-label="Close add member form" onClick={onClose}><FiX /></button></div><form className="member-form" onSubmit={handleSubmit}><label>Full name<input value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. Aisha Rao" required /></label><div className="form-grid"><label>Phone number<input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="+91 98765 43210" required /></label><label>Email address<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="member@email.com" required /></label></div><div className="form-grid"><label>Plan<select value={plan} onChange={(event) => changePlan(event.target.value as GymPlan)}><option>General</option><option>Personal</option></select></label><label>Joining date<input type="date" value={joinedAt} onChange={(event) => setJoinedAt(event.target.value)} required /></label></div><div className="form-grid"><label>Paid duration<select value={paidMonths} onChange={(event) => setPaidMonths(event.target.value)}><option value="1">1 month</option><option value="3">3 months</option><option value="6">6 months</option><option value="12">12 months</option></select></label><label>Monthly fee<input type="number" min="0" value={monthlyFee} onChange={(event) => setMonthlyFee(event.target.value)} required /></label></div><div className="form-grid"><label>Expected amount<input value={`₹${expectedAmount.toLocaleString('en-IN')}`} readOnly /></label><label>Amount paid<input type="number" min="0" value={amountPaid} onChange={(event) => setAmountPaid(event.target.value)} required /></label></div><label>Amount due<input value={`₹${amountDue.toLocaleString('en-IN')}`} readOnly /></label><p className="payment-helper">Due is calculated automatically: expected amount minus amount paid. It cannot be less than ₹0.</p><div className="modal-actions"><button className="secondary-button" type="button" onClick={onClose}>Cancel</button><button className="primary-button" type="submit" disabled={saving}>{saving ? 'Saving...' : 'Add member'}</button></div></form></section></div>
}
