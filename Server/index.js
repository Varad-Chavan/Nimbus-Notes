const connectToMongo = require('./db'); 
const express = require('express');
const cors = require('cors');
connectToMongo(); 
require('dotenv').config();

const app = express();
app.use(cors())

const port = process.env.PORT || 5000;
app.use(express.json()) //intermidator for taking input as json
//Avialbe routes
app.use('/api/auth',require('./routes/auth')) // endpoints ig
app.use('/api/notes',require('./routes/notes')) // endpoints ig

app.get('/',(req,res)=>{
    res.send('')
})

app.listen(port,()=>{
    console.log(`Nimbus Notes listening at http://localhost:${port}`)
}) //backend is active at port 5000
