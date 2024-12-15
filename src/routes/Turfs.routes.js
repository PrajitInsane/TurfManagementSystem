const express = require('express');
const router = express.Router();
const Turfs = require('../models/Turfs.model.js');
const {createturf,FindAllTurf,FindOneTurf,UpdateTurf,DeleteTurf}= require('../controllers/Turfs.controllers.js');

router.post('/',createturf);
router.get('/',FindAllTurf);
router.get('/:id',FindOneTurf);
router.put('/:id',UpdateTurf);
router.delete('/:id',DeleteTurf);

module.exports=router;