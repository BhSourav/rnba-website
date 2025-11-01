'use client'

import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">RNBA</Link>
        <div className="space-x-4">
          <Link href="/events" className="hover:underline">Events</Link>
          <Link href="/membership" className="hover:underline">Membership</Link>
          <Link href="/sponsors" className="hover:underline">Our Sponsors</Link>
          {session ? (
            <>
              <Link href="/member/dashboard" className="hover:underline">My Dashboard</Link>
              <button onClick={() => signOut()} className="hover:underline">Sign Out</button>
            </>
          ) : (
            <button onClick={() => signIn()} className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100">
              Member Login
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}
