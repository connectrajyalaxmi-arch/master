import { useState } from 'react'
import type { FormEvent } from 'react'
import { FiArrowRight, FiLock, FiMail } from 'react-icons/fi'

interface LoginPageProps {
  onLogin: (email: string, password: string) => boolean
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('admin@rswomengym.com')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(onLogin(email, password) ? '' : 'Incorrect email or password.')
  }

  return <main className="login-page"><section className="login-art"><div className="login-brand"><span className="brand-mark">RS</span><strong>RS Womens Gym</strong></div><div className="login-quote"><p className="eyebrow">Studio management</p><h1>Make room for your strongest self.</h1><p>A calm, focused workspace for every member, session and milestone.</p></div><span className="login-art-note">EST. 2018 · WOMEN'S FITNESS STUDIO</span></section><section className="login-panel"><div className="login-form-wrap"><div className="login-heading"><p className="eyebrow">Welcome back</p><h2>Sign in to your studio</h2><p>Manage your members, payments and daily rhythm.</p></div><form onSubmit={handleSubmit}><label>Email address<div className="input-with-icon"><FiMail /><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></div></label><label>Password<div className="input-with-icon"><FiLock /><input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required /></div></label>{error && <p className="form-error" role="alert">{error}</p>}<button className="primary-button login-button" type="submit">Sign in <FiArrowRight /></button></form><p className="login-hint">Demo access: admin@rswomengym.com · RS@2026</p></div></section></main>
}