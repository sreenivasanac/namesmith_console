import React from 'react'
import Domains from './domains'

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to Domain Manager</h1>
      <Domains />
    </main>
  )
}
