import React, {useState} from 'react'
import axios from 'axios'
import './../assets/css/index.css'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

function PatientRegister() {

    const {role} = useParams();
    const [user, setUser] = useState('')
    const [error, setError] = useState('')

    const handleChangeInput = e => {
        const {name, value} = e.target
        setUser({...user, [name]:value})
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const res = await axios.post(`/api/${role}/register`, user)
            console.log(res)
            if(res.status === 200) {
                setError({ type: 'success', message: res.data.message })
                window.location.href = `/${role}/login/`
            }
        }
        catch (err) {
            err.response.data.message && setError({ type: 'danger', message: err.response.data.message })
        }
    }

    return (
        <div className="d-flex">
        
        <div className="col-3 signupBackground"></div>

        <div className="container">
            <div className="row align-items-center justify-content-center">
            <div className="col-md-7 py-5">

                <h3 className="display-5">Register</h3>
                <p className="mb-4">Thanks for joining us. Please register by completing the information below.</p>

                {
                error && 
                    <div className={`postion-absolute w-100 alert alert-${error.type} alert-dismissible m-0`}>
                        <strong>Oh snap!</strong> {error.message}
                        <button type="button" class="btn-close" data-dismiss="alert"></button>
                    </div>
                }

                <form>

                <div className="row">
                    <div className="col-md-6">
                    <div className="form-group">
                        <label for="exampleInputName" className="form-label mt-4">First Name</label>
                        <input type="text" className="form-control" id="exampleInputName" aria-describedby="firstaame" placeholder="Enter First Name" name="firstName" value={user.firstName} onChange={handleChangeInput}/>
                    </div>    
                    </div>
                    <div className="col-md-6">
                    <div className="form-group">
                        <label for="exampleLastName" className="form-label mt-4">Last Name</label>
                        <input type="text" className="form-control" id="exampleLastName" aria-describedby="lastname" placeholder="Enter Last Name" name="lastName" value={user.lastName} onChange={handleChangeInput}/>
                    </div>   
                    </div>
                </div>

                <div className="row">
                    <div className="form-group">
                    <label for="exampleInputEmail" className="form-label mt-4">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail" aria-describedby="email" placeholder="Enter email" name="email" value={user.email} onChange={handleChangeInput}/>
                    <small id="email" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                    <div className="form-group">
                        <label for="exampleInputPassword" className="form-label mt-4">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword" placeholder="Password" name="password" value={user.password} onChange={handleChangeInput}/>
                    </div>
                    </div>
                    <div className="col-md-6">
                    <div className="form-group">
                        <label for="exampleInputPassword2" className="form-label mt-4">Confirm Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword2" placeholder="Password" name="confirmPassword" value={user.confirmPassword} onChange={handleChangeInput}/>
                    </div>
                    </div>
                </div>
                
                <div className="d-flex mb-5 mt-4 align-items-center">
                    <div className="d-flex align-items-center">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                        <label className="form-check-label" for="flexCheckDefault">
                        I agree to the <a href="#" className="text-primary">Terms and Conditions</a>
                        </label>
                    </div>
                    </div>
                </div>

                <button className="btn px-5 btn-primary" onClick={handleSubmit}>Sign up</button>

                <span className="text-center d-block pt-4">
                    Already have an account? <Link to={`/${role}/login`} className="text-primary"> Login</Link>
                </span>

                </form>

            </div>
            </div>
        </div>

        </div>
    )
}

export default PatientRegister