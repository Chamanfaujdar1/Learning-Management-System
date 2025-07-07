import React from 'react'
import { Outlet } from 'react-router-dom'

const AddCourse = () => {
  return (
    <div>
      <h1>Add Course Page</h1>
      <Outlet />
    </div>
  )
}

export default AddCourse
