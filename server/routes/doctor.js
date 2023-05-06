const express = require('express');
const router = express.Router();

const {Doctor} = require('../model/schema');

router.post('/doctor/register', async(req, res)=> {
    try{
        const {firstName, lastName, email, password} = req.body;
        if(!firstName || !lastName || !email || !password){
            return res.status(400).json({message: 'Please enter all fields'});    
        }
        const find = await Doctor.findOne({email});
        if(find){
            return res.status(400).json({message: 'Doctor already exists'});
        }
        var doctor = new Doctor({firstName, lastName, email, password});
        doctor = await doctor.save();
        res.status(200).json({message: 'Doctor created successfully', doctor});
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
});

router.post('/doctor/login', async(req, res)=> {
    try{
        const {email, password} = req.body;
        const doctor = await Doctor.find({email, password});
        if(doctor && doctor.length > 0){
            res.status(200).json({message: 'doctor logged in successfully', doctor});
        }
        else{
            res.status(401).json({message: 'Invalid credentials'});
        }
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
});



module.exports = router;
