import "./AddDecice.css";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from "react";
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Device } from "../../types/thingsboardTypes";
import { saveDevice } from "../../api/deviceApi";
import Loader from "../Loader/Loader";

const AddDevice = () => {
    const [loading, setLoading] = useState(false);

    const [deviceType, setDeviceType] = useState('default');
    const [admin, setAdmin] = useState('');
    const [location, setLocation] = useState('');
    const [action, setAction] = useState('');
    const [deviceName, setDevicename] = useState('');
    const [label, setLabel] = useState('');
    const [loaders, setLoaders] = useState(true);

    console.log(label)

    // const device = {
    //     "Devicename" : deviceName,
    //     "Label" : label,
    //     "Devicetype": deviceType,
    //     "Admin" : admin ,
    //     "Action" : action ,
    //     "Location" : location
    // };



    const handleDeviceTypeChange = (event: SelectChangeEvent) => {
        setDeviceType(event.target.value);
    };

    const handleAdminChange = (event: SelectChangeEvent) => {
        setAdmin(event.target.value);
    };

    const handleLocationChange = (event: SelectChangeEvent) => {
        setLocation(event.target.value);
    };

    const handleActionChange = (event: SelectChangeEvent) => {
        setAction(event.target.value);
    };

    setTimeout(() => {
        setLoaders(false);
    }, 1000)


    const handleClick = async () => {
        setLoading(true);

        setTimeout(() => {
            console.log("Data saved!");
            setLoading(false);
        }, 2000);


        

        try {
            const newDevice: Device = {
                name: deviceName,
                type: deviceType,
            };
            await saveDevice(newDevice);
            setDevicename('');

        } catch (error) {
            console.log('Failed to create device');
        }
    };


    return (
        <>
            {
                loaders ? (<Loader/>):(
                    <div className="menu-data">
                        <div className="add-device">
                            <form>
                                <label htmlFor="" className="label">Device Info</label>
                                <Box className="text-field-box">
                                    <TextField
                                        fullWidth
                                        label="Name"
                                        onChange={(e) => setDevicename(e.target.value)}
                                    />
                                </Box>
                                <label htmlFor="" className="label">Label</label>
                                <Box className="text-field-box">
                                    <TextField
                                        fullWidth
                                        label="Label"
                                        onChange={(e) => setLabel(e.target.value)}
                                    />
                                </Box>
                                <label htmlFor="" className="label">Type</label>
                                <FormControl className="form-control">
                                    <InputLabel id="device-type-label">Select Type</InputLabel>
                                    <Select
                                        labelId="device-type-label"
                                        id="device-type-select"
                                        value={deviceType}
                                        label="Select Type"
                                        onChange={handleDeviceTypeChange}
                                        className="form-control-inner"
                                    >
                                        <MenuItem value="default">
                                            <em>default</em>
                                        </MenuItem>
                                        <MenuItem value={"Teperatue"}>Teperatue</MenuItem>
                                    </Select>
                                </FormControl>
                                <label htmlFor="" className="label">Admin</label>
                                <FormControl className="form-control">
                                    <InputLabel id="admin-label">Select User</InputLabel>
                                    <Select
                                        labelId="admin-label"
                                        id="admin-select"
                                        value={admin}
                                        label="Select User"
                                        onChange={handleAdminChange}
                                        className="form-control-inner"
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                                <label htmlFor="" className="label">Location</label>
                                <FormControl className="form-control">
                                    <InputLabel id="location-label">Select Location</InputLabel>
                                    <Select
                                        labelId="location-label"
                                        id="location-select"
                                        value={location}
                                        label="Select Location"
                                        onChange={handleLocationChange}
                                        className="form-control-inner"
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                                <label htmlFor="" className="label">Action</label>
                                <FormControl className="form-control">
                                    <InputLabel id="action-label">Select Action</InputLabel>
                                    <Select
                                        labelId="action-label"
                                        id="action-select"
                                        value={action}
                                        label="Select Action"
                                        onChange={handleActionChange}
                                        className="form-control-inner"
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                                <div className="accountinfo-savebtn">
                                    <LoadingButton
                                        size="small"
                                        color="secondary"
                                        onClick={handleClick}
                                        loading={loading}
                                        loadingPosition="start"
                                        startIcon={<SaveIcon />}
                                        variant="contained"
                                        disabled={loading}
                                        className="btn-save"
                                    >
                                        <span>Save</span>
                                    </LoadingButton>
                                </div>
                            </form>
                        </div>
                    </div>
            )
        }
        </>
        
        
    );
}

export default AddDevice;


