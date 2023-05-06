// create schema for the database
const { Schema } = require('mongoose');
const mongoose = require('mongoose');
const conn = require('../db/conn');

const patientSchema = new Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String,
        default: 'patient'
    },
});

const doctorSchema = new Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String,
        default: 'doctor'
    },
});

const appointmentSchema = new Schema({
    patientId: {
        type: String
    },
    doctorId: {
        type: String,
    },
    bloodType: {
        type: String,
        required: true
    },
    bloodPressure: {
        type: String,
        required: true
    },
    bloodSugar: {
        type: String,
        required: true
    },
    allergies: {
        type: String
    },
    disease: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'pending'
    },
    consultedBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Doctor = mongoose.model('Doctor', doctorSchema);
const Patient = mongoose.model('Patient', patientSchema);
const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = {Patient, Doctor, Appointment};