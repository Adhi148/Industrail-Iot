const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const app = express();
app.use(cors());
app.use(bodyParser.json());


const mongoUri = 'mongodb+srv://sainaath4763:sainaath4763@cluster0.e0to7dq.mongodb.net/IoT_Test';

mongoose.connect(mongoUri)
.then(()=>{
    console.log("mongodb connected")
}).catch((error)=>{
    console.log("Error connecting to MongoDB", error)
});

const warehouseRouter = require('./routes/warehouseRoute');
const coolantRouter = require('./routes/coolantRoute');
const sensorRouter = require('./routes/sensorRoute');

app.use('/warehouse', warehouseRouter)
app.use('/coolant', coolantRouter)
app.use('/sensor',sensorRouter)


app.listen(2000, ()=>{
    console.log("port is running on 2000")
});