const express= require('express');
const router= express.Router();
const {createUser,findAllUsers,findOneUser,updateUser,deleteUser}= require('../controllers/Users.controllers');
const User= require('../models/Users.model');

router.get('/',findAllUsers);
router.get('/:id',findOneUser);
router.post('/',createUser);
router.put('/:id',updateUser);
router.delete('/:id',deleteUser);

module.exports= router;