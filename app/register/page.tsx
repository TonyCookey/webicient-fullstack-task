'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'


export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = async () => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    if (res.ok) {
      router.push('/login')
    } else {
      alert('Registration failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
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
        onClick={handleRegister}
      >
        Register
      </button>
      <p className="mt-4 text-center text-sm"> Already have an account?{' '}
        <Link href="/login" className="text-blue-600 underline hover:text-blue-800">Login</Link>
      </p>
    </div>
  </div>
  
  )
}