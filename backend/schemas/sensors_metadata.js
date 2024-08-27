const mongoose = require('mongoose')

const sensorSchema = mongoose.Schema({
    sensor_id : {type : String, required : true},
    indoor_location : {type : String},
    Type : [{type : String, required : true}],
    date_of_installation : {type : Date},
})

const sensor = mongoose.model('sensor_meatadata', sensorSchema);

module.exports = sensor;