import React, {useEffect, useState} from 'react'
import PatientNav from '../component/PatientNav'
import axios from 'axios'
import { DateTime } from 'luxon'

function Patient() {

    const [patient, setPatient] = useState('')
    const [record, setRecord] = useState('')
    const [appointment, setAppointment] = useState([])
    const [error, setError] = useState('')

    const handleChange = e => {
        const {name, value} = e.target
        setRecord({...record, [name]:value})
    }

    const handleSubmit = async e => {
        e.preventDefault()
        document.querySelector('.btn-close').click()
        try {
            record.patientId = patient._id
            const res = await axios.post('/api/appointment/create', record)
            if(res.status === 200) {
                setRecord('')
                setError({ type: 'success', message: res.data.message })
                window.location.href = '/patient/dashboard'
            }
        } catch (err) {
            err.response.data.message && setError({ type: 'danger', message: err.response.data.message })
        }
    }

    function formatDate(dateString) {
        const date = dateString ? new Date(dateString) : new Date();
        const formattedDate = DateTime.fromJSDate(date).toFormat('dd-LL-yyyy');
        return formattedDate;
    }

    useEffect(() => {
        const patient = JSON.parse(localStorage.getItem('patient'))
        if(!patient) window.location.href = '/'
        setPatient(patient[0])
    }, [])


    useEffect(() => {
        const getAppointment = async () => {
            try {
                const res = await axios.get(`/api/appointment/${patient._id}`)
                if(res.status === 200) {
                    setAppointment(res.data.appointments)
                }
                } 
                catch (err) {
                    console.log(err)
                }
        }
        getAppointment()
    }, [patient])

    return (
        <>
            <PatientNav patient={patient}/>
            <div className="container my-5">
                <div className="d-flex justify-content-between align-items-center">
                    <h1 className='display-6'>Appointment</h1>
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
                            <h3 className='text-center'>No appointment</h3>
                        </div>
                        :
                        <div className='p-5 bg-light rounded-3'>
                            <table className="table table-hover table-secondary align-middle text-center">
                                <thead>
                                    <tr>
                                        <th scope="col">Sr. No.</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Consulted By</th>
                                        <th scope="col">Details</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        appointment &&
                                        appointment.map((appointment, index) => (
                                            <tr key={appointment._id}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{formatDate(appointment.date)}</td>
                                                <td>{appointment.status}</td>
                                                <td>{appointment.consultedBy ? appointment.consultedBy : 'Not Consulted'}</td>
                                                <td >{appointment.status === 'pending' ? 'Not Available yet' : 'Consulted'}</td>
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
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add Appointment</h5>
                        <button type="button"  className="btn-close" data-dismiss="modal" aria-label="Close" data-toggle="modal" data-target="#exampleModal">
                            <span aria-hidden="true"></span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div class="form-group">
                                <label for="bloodtype" class="form-label">Blood Type</label>
                                <select class="form-select" id="bloodtype" name="bloodType" value={record.bloodType} onChange={handleChange}>
                                    <option selected>Select Blood Type</option>
                                    <option value="A+">A+</option>
                                    <option value="B+">B+</option>
                                    <option value="AB+">AB+</option>
                                    <option value="O+">O+</option>
                                    <option value="A-">A-</option>
                                    <option value="B-">B-</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O-">O-</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="bloodpressure" class="form-label mt-4">Blood Pressure</label>
                                <input type="text" class="form-control" id="bloodpressure" placeholder="Enter Blood Pressure (mm Hg)" name="bloodPressure" value={record.bloodPressure} onChange={handleChange}/>
                            </div>
                            <div class="form-group">
                                <label for="bloodsugar" class="form-label mt-4">Blood Sugar</label>
                                <input type="text" class="form-control" id="bloodsugar" placeholder="Enter Blood Sugar (mg/dL)" name="bloodSugar" value={record.bloodSugar} onChange={handleChange}/>
                            </div>
                            <div class="form-group">
                                <label for="allergies" class="form-label mt-4">Allergies</label>
                                <input type="text" class="form-control" id="allergies" placeholder="Enter Allergy Type" name="allergies" value={record.allergies} onChange={handleChange}/>
                            </div>
                            <div class="form-group">
                                <label for="disease" class="form-label mt-4">Current Diseases</label>
                                <input type="text" class="form-control" id="disease" placeholder="Enter Current Diseases" name="disease" value={record.disease} onChange={handleChange}/>
                            </div>
                            <div class="form-group">
                                <label for="details" class="form-label mt-4">Details and Symptoms</label>
                                <textarea class="form-control" id="details" rows="3" name="details" value={record.details} onChange={handleChange}></textarea>
                            </div>
                            <button type="submit" class="btn btn-primary mt-4 w-100" onClick={handleSubmit}>Submit</button>
                        </form>
                    </div>
                    </div>
                </div>
            </div>
            {
                appointment &&
                appointment.map((appointment, index) => (
                    <div className="modal fade" id={`exampleModal${index}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-scrollable modal-lg">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Appointment Details</h5>
                                <button type="button"  className="btn-close" data-dismiss="modal" aria-label="Close" data-toggle="modal" data-target={`#exampleModal${index}`}>
                                    <span aria-hidden="true"></span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h5 className='text-center bg-light p-2 rounded'>Patient Details</h5>
                                        <div className="row">
                                            <div className="col-md-6 text-center">
                                                <p className='fw-bold mt-1'>Name</p>
                                                <p className='fw-bold mt-1'>Blood Group</p>
                                                <p className='fw-bold mt-1'>Blood Pressure</p>
                                                <p className='fw-bold mt-1'>Blood Sugar</p>
                                                <p className='fw-bold mt-1'>Allergies</p>
                                                <p className='fw-bold mt-1'>Current Diseases</p>
                                                <p className='fw-bold mt-1'>Details</p>
                                            </div>
                                            <div className="col-md-6 text-center">
                                                <p className='mt-1'>{patient.firstName}</p>
                                                <p className='mt-1'>{appointment.bloodType}</p>
                                                <p className='mt-1'>{appointment.bloodPressure}</p>
                                                <p className='mt-1'>{appointment.bloodSugar}</p>
                                                <p className='mt-1'>{appointment.allergies}</p>
                                                <p className='mt-1'>{appointment.disease}</p>
                                                <p className='mt-1'>{appointment.details}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                ))
            }

        </>
    )
}

export default Patient