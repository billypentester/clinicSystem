const express = require('express');
const router = express.Router();

const {Patient} = require('../model/schema');

router.post('/patient/register', async(req, res)=> {
    try{
        const {firstName, lastName, email, password} = req.body;
        if(!firstName || !lastName || !email || !password){
            return res.status(400).json({message: 'Please enter all fields'});    
        }
        const find = await Patient.findOne({email});
        if(find){
            return res.status(400).json({message: 'Patient already exists'});
        }
        var patient = new Patient({firstName, lastName, email, password});
        patient = await patient.save();
        res.status(200).json({message: 'Patient created successfully', patient});
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
});

router.post('/patient/login', async(req, res)=> {
    try{
        const {email, password} = req.body;
        const patient = await Patient.find({email, password});
        if(patient && patient.length > 0){
            res.status(200).json({message: 'Patient logged in successfully', patient});
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
