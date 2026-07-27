import React from 'react'
import Card from '../ui/Card'
import { Outlet } from 'react-router'

const MainLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default MainLayout