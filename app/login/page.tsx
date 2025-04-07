'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    if (res.ok) {
      const { token } = await res.json()
      localStorage.setItem('token', token)
      router.push('/dashboard')
    } else {
      alert('Login failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <input
        className="border border-gray-300 rounded px-4 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="border border-gray-300 rounded px-4 py-2 w-full mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 w-full rounded"
        onClick={handleLogin}
      >
        Login
      </button>
      <p className="mt-4 text-center text-sm">
        Don’t have an account?{' '}
        <Link href="/register" className="text-blue-600 underline hover:text-blue-800">
          Register
        </Link>
      </p>

    </div>
  </div>
  
  )
}