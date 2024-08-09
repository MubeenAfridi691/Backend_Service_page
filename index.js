require('dotenv').config();
const express = require('express');
const app = express();
const port = 5000;
const db = require('./utils/db');
app.use(express.json());
const usermodel = require('./models/usermodel');
const contact = require('./Routes/ContactRoutes')
var cors = require('cors')
app.use(cors())



const auth = require('./Routes/auth');
app.use('/',auth);
app.use('/',contact);



app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})