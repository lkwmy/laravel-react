import React from 'react'
import AutoLogout from './AutoLogout'

function DashboardHome() {
  return (
    <div className="flex-1 p-8">
      <AutoLogout/>
    <h1 className="text-2xl font-bold text-gray-800">Tableau de bord</h1>
    <p className="mt-4 text-gray-600">Bienvenue sur la page du tableau de bord.</p>
    
  </div>
  )
}

export default DashboardHome