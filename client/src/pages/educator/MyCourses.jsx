import React from 'react'
import { Outlet } from 'react-router-dom'

const MyCourses = () => {
  return (
    <div>
      <h1>My Courses page</h1>
      <Outlet/>
    </div>
  )
}

export default MyCourses
