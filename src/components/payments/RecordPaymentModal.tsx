import { useState } from 'react'
import type { FormEvent } from 'react'
import { FiX } from 'react-icons/fi'
import type { Member, Payment, PaymentMethod } from '../../types'

interface RecordPaymentModalProps { members: Member[]; onClose: () => void; onSave: (payment: Payment) => Promise<void> }

export function RecordPaymentModal({ members, onClose, onSave }: RecordPaymentModalProps) {
  const [memberId, setMemberId] = useState(members[0]?.id ?? '')
  const [amount, setAmount] = useState('')
  const [method, setMethod] = useState<PaymentMethod>('UPI')
  const [saving, setSaving] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    const member = members.find((item) => item.id === memberId)
    if (!member) return
    await onSave({ id: crypto.randomUUID(), memberId, memberName: member.name, amount: Number(amount), method, paidAtDate: new Date().toISOString().slice(0, 10), paidAt: 'Just now', receiptNumber: `RS-${Date.now().toString().slice(-5)}` })
    setSaving(false)
    onClose()
  }

  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) onClose() }}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="record-payment-title"><div className="modal-heading"><div><p className="eyebrow">Finance</p><h2 id="record-payment-title">Record a payment</h2></div><button className="icon-button" type="button" aria-label="Close payment form" onClick={onClose}><FiX /></button></div><form className="member-form" onSubmit={handleSubmit}><label>Member<select value={memberId} onChange={(event) => setMemberId(event.target.value)} required>{members.map((member) => <option key={member.id} value={member.id}>{member.name} {member.amountDue ? `(₹${member.amountDue.toLocaleString('en-IN')} due)` : ''}</option>)}</select></label><div className="form-grid"><label>Amount<input type="number" min="1" value={amount} onChange={(event) => setAmount(event.target.value)} placeholder="₹ 0" required /></label><label>Payment method<select value={method} onChange={(event) => setMethod(event.target.value as PaymentMethod)}><option>UPI</option><option>Cash</option><option>Card</option><option>Bank transfer</option></select></label></div><div className="modal-actions"><button className="secondary-button" type="button" onClick={onClose}>Cancel</button><button className="primary-button" type="submit" disabled={saving}>{saving ? 'Saving...' : 'Record payment'}</button></div></form></section></div>
}
