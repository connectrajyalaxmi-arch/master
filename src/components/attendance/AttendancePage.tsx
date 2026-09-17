import { useState } from 'react'
import { FiCheck, FiClipboard } from 'react-icons/fi'
import type { AttendanceRecord, Member } from '../../types'

export function AttendancePage({ members, records, onSave }: { members: Member[]; records: AttendanceRecord[]; onSave: (record: AttendanceRecord) => Promise<void> }) {
  const today = new Date().toISOString().slice(0, 10)
  const [date, setDate] = useState(today)
  const [savingId, setSavingId] = useState<string | null>(null)
  const [savedId, setSavedId] = useState<string | null>(null)
  const [error, setError] = useState('')
  const presentIds = new Set(records.filter((record) => record.date === date && record.status === 'Present').map((record) => record.memberId))
  async function save(member: Member, present: boolean) { const id = `${member.id}-${date}`; setSavingId(id); setSavedId(null); setError(''); try { await onSave({ id, memberId: member.id, memberName: member.name, date, status: present ? 'Absent' : 'Present' }); setSavedId(id) } catch { setError('Attendance could not be saved. Please try again.') } finally { setSavingId(null) } }
  return <div className="feature-page"><section className="page-heading"><div><p className="eyebrow">Daily check-in</p><h1>Attendance</h1><p className="heading-copy">Mark who attended and keep a simple attendance history.</p></div><div className="attendance-date"><label>Date<input type="date" value={date} onChange={(event) => { setDate(event.target.value); setSavedId(null) }} /></label></div></section><section className="panel attendance-panel"><div className="panel-heading"><div><p className="eyebrow">{presentIds.size} checked in</p><h2>Member check-in</h2></div><FiClipboard className="panel-icon" /></div>{error && <p className="form-error" role="alert">{error}</p>}<div className="attendance-list">{members.map((member) => { const present = presentIds.has(member.id); const id = `${member.id}-${date}`; return <div className="attendance-row" key={member.id}><div className="avatar">{member.initials}</div><div><strong>{member.name}</strong><span>{member.plan}</span></div><button className={`attendance-toggle ${present ? 'present' : ''}`} disabled={savingId === id} onClick={() => void save(member, present)}><FiCheck /> {savingId === id ? 'Saving...' : savedId === id ? 'Saved' : present ? 'Present' : 'Mark present'}</button></div> })}</div></section></div>
}
