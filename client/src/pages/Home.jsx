import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
      <div className='d-flex flex-column'>
        <h1 className='my-5 display-5'>Welcome to the Medical System</h1>
        <div className='d-flex justify-content-center'>
          <div className="m-3 col-5 border rounded-3">
            <div className="m-3 text-center">
              <img src="https://cdn-icons-png.flaticon.com/512/4228/4228704.png" alt="patient" width="150px" height="150px"/>
              <div className='my-4'>
                <h4>Patient</h4>
              </div>
              <div className='my-2'>
                <div className='row justify-content-evenly'>                  
                  <Link to='/patient/register' className='btn btn-primary mx-2 col-5'>Register</Link>
                  <Link to='/patient/login' className='btn btn-primary mx-2 col-5'>Login</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="m-3 col-5 border rounded-3">
            <div className="m-3 text-center">
              <img src="https://cdn-icons-png.flaticon.com/512/387/387561.png" alt="doctor" width="150px" height="150px"/>
              <div className='my-4'>
                <h4>Doctor</h4>
              </div>
              <div className='my-2'>
                <div className='row justify-content-evenly'>                  
                  <Link to='/doctor/register' className='btn btn-primary mx-2 col-5'>Register</Link>
                  <Link to='/doctor/login' className='btn btn-primary mx-2 col-5'>Login</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home