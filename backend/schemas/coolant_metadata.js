const mongoose = require('mongoose')
const { type } = require('os')

const coolantSchema = mongoose.Schema({
    coolant_id : {type : String, required: true},
    location_in_warehouse : {type: String}
})

const coolant = mongoose.model('coolant_metadata', coolantSchema);
module.exports = coolant;