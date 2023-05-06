const express = require('express')
const app = express()
var morgan = require('morgan')
const port = 3001

const patient = require('./routes/patient');
const doctor = require('./routes/doctor');
const appointment = require('./routes/appointment');

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))

app.use(patient);
app.use(doctor);
app.use(appointment);

app.get('/', (req, res) => res.send('Hello World!'))



app.listen(port, () => console.log(`Example app listening on port ${port}!`))