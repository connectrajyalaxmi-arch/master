import { useState } from 'react'
import type { FormEvent } from 'react'
import { FiX } from 'react-icons/fi'
import type { StudioSession } from '../../types'

export function AddSessionModal({ onClose, onSave }: { onClose: () => void; onSave: (session: StudioSession) => Promise<void> }) {
  const [title, setTitle] = useState('')
  const [time, setTime] = useState('07:00')
  const [trainer, setTrainer] = useState('Deepika Gadapa')
  const [members, setMembers] = useState('10')
  async function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); await onSave({ id: crypto.randomUUID(), title, time, trainer, members: Number(members), tone: 'rose-line', state: 'Upcoming' }); onClose() }
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) onClose() }}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="session-title"><div className="modal-heading"><div><p className="eyebrow">Daily schedule</p><h2 id="session-title">Add session</h2></div><button className="icon-button" type="button" onClick={onClose} aria-label="Close"><FiX /></button></div><form className="member-form" onSubmit={submit}><label>Session name<input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. Pilates Flow" required /></label><div className="form-grid"><label>Time<input type="time" value={time} onChange={(event) => setTime(event.target.value)} required /></label><label>Trainer<input value={trainer} onChange={(event) => setTrainer(event.target.value)} required /></label></div><label>Expected members<input type="number" min="1" value={members} onChange={(event) => setMembers(event.target.value)} required /></label><div className="modal-actions"><button className="secondary-button" type="button" onClick={onClose}>Cancel</button><button className="primary-button" type="submit">Add session</button></div></form></section></div>
}
