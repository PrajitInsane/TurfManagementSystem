const mongoose = require('mongoose');
const Turf = require('../models/Turfs.model.js');

// Create and Save a new Turf
const createturf = async(req, res) => {
    try{
        const turf= Turf.create(req.body);
        res.status(200).json(turf);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}

//Retrieve all the turf details
const FindAllTurf= async(req,res)=>{
    try{
        const turfs= await Turf.find();
        res.status(200).json(turfs);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}

//Retrieve a single turf details
const FindOneTurf=async(req,res)=>{
    try{
        const {id}= req.params;
        const turf= await Turf.findById(id);
        res.status(200).json(turf);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}

//Update a turf details
const UpdateTurf=async(req,res)=>{
    try{
        const {id}=req.params;
        const turf= await Turf.findByIdAndUpdate(id,req.body);
        if(!turf){
            return res.status(404).json({message:"Turf not found"});
        }
        const updateTurf= await Turf.findById(id);
        res.status(200).json(updateTurf);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}

//Delete a turf details
const DeleteTurf=async(req,res)=>{
    try{
        const {id}=req.params;
        const turf= await Turf.findByIdAndDelete(id);
        res.status(200).json(turf);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}

module.exports={createturf,FindAllTurf,FindOneTurf,UpdateTurf,DeleteTurf
};