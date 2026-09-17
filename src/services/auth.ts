const sessionKey = 'rs-women-gym-session'

export interface AuthUser {
  name: string
  email: string
  role: string
}

const demoUser: AuthUser = { name: 'Deepika Gadapa', email: 'admin@rswomengym.com', role: 'Administrator' }

export function getSession(): AuthUser | null {
  return localStorage.getItem(sessionKey) ? demoUser : null
}

export function login(email: string, password: string): AuthUser | null {
  if (email.trim().toLowerCase() !== demoUser.email || password !== 'RS@2026') return null
  localStorage.setItem(sessionKey, 'active')
  return demoUser
}

export function logout(): void {
  localStorage.removeItem(sessionKey)
}