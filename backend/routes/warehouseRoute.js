const express = require('express');
const router = express.Router();
const warehouse = require('../schemas/warehouse_metadata');

// create a new warehouse
router.post('/addwarehouse', async(req, res) =>{
    try {
        const newwarehouse = new warehouse(req.body);
        await newwarehouse.save();
        res.status(201).send(newwarehouse);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/getallwarehouse', async(req, res) => {
    try {
        const getallwarehouse = await warehouse.find()
        .populate({
            path: 'cooling_units.coolant',
            select: 'coolant_id location_in_warehouse'  
        })
        .populate({
            path: 'sensors.sensor',
            select: 'sensor_id indoor_location Type date_of_installation' 
        })
        .exec();

        if (!getallwarehouse) {
            return res.status(404).json({ message: 'Warehouse not found' });
        }
        res.status(200).json(getallwarehouse);
    } catch (error) {
        
        res.status(500).json({ message: 'Error retrieving warehouse data', error });
    }
});

router.get('/getwarehouse/:id', async(req, res) => {
    try {
        const getwarehouse = await warehouse.findById(req.params.id)
        .populate({
            path: 'cooling_units.coolant',
            select: 'coolant_id location_in_warehouse'  
        })
        .populate({
            path: 'sensors.sensor',
            select: 'sensor_id indoor_location Type date_of_installation' 
        })
        .exec();

        if (!getwarehouse) {
            return res.status(404).json({ message: 'Warehouse not found' });
        }
        res.status(200).json(getwarehouse);
    } catch (error) {
        
        res.status(500).json({ message: 'Error retrieving warehouse data', error });
    }
});

module.exports = router