const Users= require('../models/Users.model');

// Create and Save a new User
const createUser = async(req,res)=>{
    try{
        const user= Users.create(req.body);
        res.status(200).json(user);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}

// Retrieve and return all users from the database.
const findAllUsers = async(req,res)=>{
    try{
        const users= await Users.find();
        res.status(200).json(users);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}

// Find a single user with a userId
const findOneUser = async(req,res)=>{
    try{
        const {id}= req.params;
        const user= await Users.findById(id);
        res.status(200).json(user);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}

// Update a user identified by the userId in the request
const updateUser = async(req,res)=>{
    try{
        const {id}= req.params;
        const user= await Users.findByIdAndUpdate(id,req.body);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        const updateUser= await Users.findById(id);
        res.status(200).json(updateUser);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}

// Delete a user with the specified userId in the request
const deleteUser = async(req,res)=>{
    try{
        const {id}= req.params;
        const user= await Users.findByIdAndDelete(id);
        res.status(200).json(user);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}

module.exports={createUser,findAllUsers,findOneUser,updateUser,deleteUser};

