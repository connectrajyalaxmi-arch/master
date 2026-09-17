import { useMemo, useState } from 'react'
import { FiArrowDownLeft, FiCreditCard, FiDownload, FiPlus } from 'react-icons/fi'
import { RecordPaymentModal } from './RecordPaymentModal'
import type { DashboardData, Payment } from '../../types'

type PaymentFilter = 'all' | 'today' | 'this-month' | 'last-month' | 'custom'

function formatDate(date: Date) { return date.toISOString().slice(0, 10) }
function paymentDate(payment: Payment) {
  if (payment.paidAtDate) return payment.paidAtDate
  if (payment.paidAt.startsWith('Today')) return formatDate(new Date())
  if (payment.paidAt.startsWith('Yesterday')) { const date = new Date(); date.setDate(date.getDate() - 1); return formatDate(date) }
  return null
}

export function PaymentsPage({ data, onAddPayment }: { data: DashboardData; onAddPayment: (payment: Payment) => Promise<void> }) {
  const [isRecordOpen, setIsRecordOpen] = useState(false)
  const [filter, setFilter] = useState<PaymentFilter>('all')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const todayKey = formatDate(new Date())
  const filteredPayments = useMemo(() => data.payments.filter((payment) => {
    const date = paymentDate(payment)
    if (filter === 'all') return true
    if (!date) return false
    if (filter === 'today') return date === todayKey
    if (filter === 'this-month') return date.slice(0, 7) === todayKey.slice(0, 7)
    if (filter === 'last-month') { const currentDate = new Date(`${todayKey}T00:00:00`); const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1); return date.slice(0, 7) === formatDate(lastMonth).slice(0, 7) }
    return (!fromDate || date >= fromDate) && (!toDate || date <= toDate)
  }), [data.payments, filter, fromDate, toDate, todayKey])
  const total = filteredPayments.reduce((sum, payment) => sum + payment.amount, 0)
  const filterLabel = filter === 'all' ? 'All payments' : filter === 'last-month' ? 'Last month' : filter === 'this-month' ? 'This month' : filter === 'today' ? 'Today' : 'Custom range'

  return <div className="feature-page"><section className="page-heading"><div><p className="eyebrow">Finance</p><h1>Payments</h1><p className="heading-copy">Track collections, receipts and outstanding dues.</p></div><button className="primary-button" onClick={() => setIsRecordOpen(true)}><FiPlus /> Record payment</button></section><section className="stat-grid payment-stats"><article className="stat-card"><div className="stat-icon green"><FiArrowDownLeft /></div><div className="stat-copy"><span>Collected: {filterLabel}</span><strong>₹{total.toLocaleString('en-IN')}</strong><small className="positive">Across {filteredPayments.length} payments</small></div></article><article className="stat-card"><div className="stat-icon amber"><FiCreditCard /></div><div className="stat-copy"><span>Total fees due</span><strong>₹{data.members.reduce((sum, member) => sum + member.amountDue, 0).toLocaleString('en-IN')}</strong><small>Needs follow-up</small></div></article></section><section className="panel payments-page-panel"><div className="panel-heading"><div><p className="eyebrow">Transaction history</p><h2>{filterLabel}</h2></div><button className="outline-button export-button"><FiDownload /> Export</button></div><div className="payment-filter-bar"><label>Period<select value={filter} onChange={(event) => setFilter(event.target.value as PaymentFilter)}><option value="all">All payments</option><option value="today">Today</option><option value="this-month">This month</option><option value="last-month">Last month</option><option value="custom">Custom range</option></select></label>{filter === 'custom' && <><label>From<input type="date" value={fromDate} onChange={(event) => setFromDate(event.target.value)} /></label><label>To<input type="date" value={toDate} onChange={(event) => setToDate(event.target.value)} /></label></>}</div><div className="payment-list full-payment-list">{filteredPayments.map((payment) => <div className="payment-row" key={payment.id}><div className="avatar">{payment.memberName.split(' ').map((part) => part[0]).join('')}</div><div className="payment-member"><strong>{payment.memberName}</strong><span>{payment.receiptNumber} · {payment.paidAtDate ? new Date(`${payment.paidAtDate}T00:00:00`).toLocaleDateString('en-IN') : payment.paidAt}</span></div><div className="payment-method">{payment.method}</div><strong className="payment-amount">₹{payment.amount.toLocaleString('en-IN')}</strong></div>)}{filteredPayments.length === 0 && <div className="empty-state"><FiCreditCard /><h2>No payments in this period</h2><p>Try another period or record a new payment.</p></div>}</div></section>{isRecordOpen && <RecordPaymentModal members={data.members} onClose={() => setIsRecordOpen(false)} onSave={onAddPayment} />}</div>
}
