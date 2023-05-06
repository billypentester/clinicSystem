import React, {useState, useEffect} from 'react'
import DoctorNav from './../component/DoctorNav'
import axios from 'axios'
import { DateTime } from 'luxon'

function Doctor() {

    const [doctor, setDoctor] = useState('')
    const [record, setRecord] = useState('')
    const [appointment, setAppointment] = useState([])
    const [error, setError] = useState('')

    const handleChange = e => {
        const {name, value} = e.target
        setRecord({...record, [name]:value})
    }

    function formatDate(dateString) {
      const date = dateString ? new Date(dateString) : new Date();
      const formattedDate = DateTime.fromJSDate(date).toFormat('dd-LL-yyyy');
      return formattedDate;
    }

    useEffect(() => {
      const doctor = JSON.parse(localStorage.getItem('doctor'))
      if(!doctor) window.location.href = '/'
      setDoctor(doctor[0])
    }, [])

    useEffect(() => {
      const getAppointment = async () => {
        try {
          const {data} = await axios.get(`/api/appointment/all`)
          setAppointment(data.appointments)
        } 
        catch (error) {
          setError({type: 'danger', message: error.response.data.message})
        }
      }
      getAppointment()
    }, [])

  return (
    <>
      <DoctorNav doctor={doctor} />
      <div className="container my-5">
          <div className="d-flex justify-content-between align-items-center">
              <h1 className='display-6'>Patients</h1>
              <button className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Add Appointment</button>
          </div>
          {
          error && 
              <div className={`postion-absolute w-100 alert alert-${error.type} alert-dismissible m-0`}>
                  <strong>Oh snap!</strong> {error.message}
                  <button type="button" class="btn-close" data-dismiss="alert"></button>
              </div>
          }
          <div className='mt-5'>
              {
                  appointment.length === 0 ?
                  <div className='d-flex justify-content-center align-items-center bg-light rounded-3' style={{height: '50vh'}}>
                      <h3 className='text-center'>No Patients</h3>
                  </div>
                  :
                  <div className='p-5 bg-light rounded-3'>
                      <table className="table table-hover table-secondary align-middle text-center">
                          <thead>
                              <tr>
                                  <th scope="col">Sr. No.</th>
                                  <th scope="col">Name</th>
                                  <th scope="col">Disease</th>
                                  <th scope="col">Date</th>
                                  <th scope="col">Status</th>
                                  <th scope="col">Consulted By</th>
                                  <th scope="col">Action</th>
                              </tr>
                          </thead>
                          <tbody>
                              {
                                  appointment &&
                                  appointment.map((appointment, index) => (
                                      <tr key={appointment._id}>
                                          <th scope="row">{index + 1}</th>
                                          <td>{appointment.patient.name}</td>
                                          <td>{appointment.disease}</td>
                                          <td>{formatDate(appointment.date)}</td>
                                          <td>{appointment.status}</td>
                                          <td>{appointment.consultedBy ? appointment.consultedBy : 'Not Consulted'}</td>
                                          <td><button className="btn btn-primary" data-toggle="modal" data-target={`#exampleModal${index}`}>View</button></td>
                                      </tr>
                                  ))
                              }
                          </tbody>
                      </table>
                  </div>
              }
          </div>
      </div>
    </>
  )
}

export default Doctor