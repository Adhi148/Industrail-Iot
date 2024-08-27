const express = require('express');
const router = express.Router();
const sensor = require('../schemas/sensors_metadata');
const warehouse = require('../schemas/warehouse_metadata')
const { model } = require('mongoose');

// create a new sensor
router.post('/addsensor', async(req, res) => {
    try {
        const newsensor = new sensor(req.body);
        await newsensor.save();
        res.status(201).send(newsensor);
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/getallsensors', async(req, res) => {
    try {
        const allsensors = await sensor.find();
        res.status(201).json(allsensors) 
    } catch (error) {
        res.status(400).send(error)
    }
});

router.get('/getavaliablesensors', async(req, res) => {
    try {
        const allsensors = await sensor.find();

        const allwarehouse = await warehouse.find()
        .populate({
            path: 'sensors.sensor',
            select: 'sensor_id'
        })
        .exec();

        const usedSensordIds = new Set();
        allwarehouse.forEach(warehouse => {
            warehouse.sensors.forEach(unit => {
                if(unit.sensor && unit.sensor.sensor_id){
                    usedSensordIds.add(unit.sensor.sensor_id)
                }
            })
        })

        const avaliableSensors = allsensors.filter(sensor => !usedSensordIds.has(sensor.sensor_id))

        res.status(200).json(avaliableSensors)

    } catch (error) {
        res.status(400).send({ message: 'Error retrieving available sensors', error });
    }
})

module.exports = router;