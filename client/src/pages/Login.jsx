import React, {useState} from 'react'
import axios from 'axios'
import './../assets/css/index.css'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

function Login() {

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
          const res = await axios.post(`/api/${role}/login`, user)
          if(res.status === 200) {
            console.log(res.data.patient)
            // localStorage.setItem('patient', JSON.stringify(res.data.patient))
            localStorage.setItem(role, JSON.stringify(res.data[role]))
            setError({ type: 'success', message: res.data.message })
            window.location.href = `/${role}/dashboard`
          }
        } 
        catch (err) {
            err.response.data.message && setError({ type: 'danger', message: err.response.data.message })
        }
      }


    return (
        <div className="d-flex">

            <div className="col-3 loginBackground"></div>

            <div className="container">
            <div className="row align-items-center justify-content-center">
                <div className="col-md-7 py-5">
                <h3 className="display-5">Login</h3>
                <p className="mb-4">Welcome back! Please log in to access your account.</p>

                {
                error && 
                    <div className={`postion-absolute w-100 alert alert-${error.type} alert-dismissible m-0`}>
                        <strong>Oh snap!</strong> {error.message}
                        <button type="button" class="btn-close" data-dismiss="alert"></button>
                    </div>
                }

                <form>

                    <div className="row">
                    <div className="form-group">
                        <label for="exampleInputEmail" className="form-label mt-4">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail" aria-describedby="email" placeholder="Enter email" name="email" value={user.email} onChange={handleChangeInput}/>
                    </div>
                    </div>

                    <div className="row">
                    <div className="form-group">
                        <label for="exampleInputPassword" className="form-label mt-4">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword" placeholder="Password" name="password" value={user.password} onChange={handleChangeInput}/>
                    </div>
                    </div>
                    
                    <div className="d-flex mb-5 mt-4 align-items-center">
                    <div className="d-flex align-items-center">
                        <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                        <label className="form-check-label" for="flexCheckDefault">
                            Keep me logged in
                        </label>
                        </div>
                    </div>
                    </div>

                    <button className="btn px-5 btn-primary" onClick={handleSubmit}>Login</button>

                    <span className="text-center d-block pt-4">
                    Don't have an account? <Link to={`/${role}/register`} className="text-primary"> Signup</Link>
                    </span>

                </form>
                </div>
            </div>
            </div>

        </div>
    )
}

export default Login