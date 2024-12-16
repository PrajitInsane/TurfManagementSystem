const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/Users.model.js');
const UserRoute = require('./routes/Users.routes.js');
const TurfRoute = require('./routes/Turfs.routes.js');
const app = express();
const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/api/images', express.static('./assets'));
app.use('/api/users',UserRoute);
app.use('/api/turfs',TurfRoute);

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

