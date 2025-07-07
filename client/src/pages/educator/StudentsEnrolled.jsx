import React from 'react'
import { Outlet } from 'react-router-dom'

const StudentsEnrolled = () => {
  return (
    <div>
      <h1>Students Enrolled page</h1>
      <Outlet/>
    </div>
  )
}

export default StudentsEnrolled
