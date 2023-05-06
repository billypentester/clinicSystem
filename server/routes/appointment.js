const express = require('express');
const router = express.Router();

const {Appointment, Patient} = require('../model/schema');

router.get('/appointment/all', async(req, res)=> {
    try{
        const appointments = await Appointment.find();
        if(!appointments || appointments.length == 0){
            return res.status(400).json({message: 'No appointments found'});    
        }
        const patientIds = appointments.map(appointment => appointment.patientId);
        const patients = await Patient.find({_id: {$in: patientIds}});
        const appointmentsWithPatients = appointments.map(appointment => {
            const patient = patients.find(patient => patient._id == appointment.patientId);
            return {
                ...appointment._doc,
                patient: {
                    name: patient.firstName + ' ' + patient.lastName,
                    email: patient.email
                }
            }
        });
        res.status(200).json({message: 'Appointments fetched successfully', appointments: appointmentsWithPatients});
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
});

router.post('/appointment/create', async(req, res)=> {
    try{
        const {patientId, bloodType, bloodPressure, bloodSugar, disease, details} = req.body;
        if(!patientId || !bloodType || !bloodPressure || !bloodSugar || !disease || !details){
            return res.status(400).json({message: 'Please enter all fields'});    
        }
        var appointment = new Appointment(req.body);
        appointment = await appointment.save();
        res.status(200).json({message: 'Appointment created successfully', appointment});
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
});


router.get('/appointment/:patientId', async(req, res)=> {
    try{
        const {patientId} = req.params;
        const appointments = await Appointment.find({patientId});
        const patient =  await Patient.findOne({_id: patientId});
        if(!appointments || appointments.length == 0){
            return res.status(400).json({message: 'No appointments found'});    
        }
        res.status(200).json({message: 'Appointments fetched successfully', appointments, patient});
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
});

// get all appointments




module.exports = router;