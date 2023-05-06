import React from 'react'

function PatientNav({doctor}) {

    const logout = () => {
        localStorage.clear()
        window.location.href = '/'
    }

  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand" href="#">Welcome {doctor.firstName}</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarColor02">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                    <a class="btn nav-link" onClick={logout}>Logout</a>
                </li>
            </ul>
            </div>
        </div>
    </nav>
  )
}

export default PatientNav