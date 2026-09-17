import { FiAlertCircle, FiBell, FiCreditCard, FiUserCheck } from 'react-icons/fi'
import type { DashboardData } from '../../types'

export function NotificationsPage({ data }: { data: DashboardData }) {
  const expiring = data.members.filter((member) => member.status === 'Expiring soon')
  const expired = data.members.filter((member) => member.status === 'Expired')
  const due = data.members.filter((member) => member.amountDue > 0)
  const notifications = [
    ...expiring.map((member) => ({ id: `expiring-${member.id}`, type: 'warm', icon: FiBell, title: `${member.name}'s membership expires soon`, detail: `Membership ends on ${new Date(member.expiresAt).toLocaleDateString('en-IN')}.`, time: 'Membership alert' })),
    ...expired.map((member) => ({ id: `expired-${member.id}`, type: 'danger', icon: FiAlertCircle, title: `${member.name}'s membership has expired`, detail: 'Follow up to renew their membership.', time: 'Membership alert' })),
    ...due.map((member) => ({ id: `due-${member.id}`, type: 'cool', icon: FiCreditCard, title: `Payment due from ${member.name}`, detail: `₹${member.amountDue.toLocaleString('en-IN')} is outstanding.`, time: 'Payment alert' })),
    { id: 'trainer-review', type: 'green', icon: FiUserCheck, title: 'Trainer review tomorrow', detail: 'Monthly team check-in is scheduled for 10:00.', time: 'Studio alert' },
  ]
  return <div className="feature-page"><section className="page-heading"><div><p className="eyebrow">Stay informed</p><h1>Notifications</h1><p className="heading-copy">Important updates from your studio workspace.</p></div><span className="alert-count notification-total">{notifications.length}</span></section><section className="panel notification-panel"><div className="panel-heading"><div><p className="eyebrow">Action center</p><h2>Recent alerts</h2></div></div><div className="notification-list">{notifications.map(({ id, type, icon: Icon, title, detail, time }) => <article className="notification-row" key={id}><div className={`alert-symbol alert-${type}`}><Icon /></div><div><strong>{title}</strong><p>{detail}</p><small>{time}</small></div></article>)}{notifications.length === 0 && <div className="empty-state"><FiBell /><h2>You're all caught up</h2><p>There are no notifications right now.</p></div>}</div></section></div>
}
