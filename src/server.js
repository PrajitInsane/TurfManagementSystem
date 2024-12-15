const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/Users.model.js');
const UserRoute = require('./routes/Users.routes.js');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/api/users',UserRoute);

mongoose.connect('mongodb+srv://admin:12345@nodeapi.ydbub.mongodb.net/?retryWrites=true&w=majority&appName=NodeAPI')
.then(()=>{
    console.log("Connected");
    app.listen(5000,()=>{
        console.log('Server is running on port 5000');
    })
})
.catch(()=>{
    console.log("Not Connected");
})

