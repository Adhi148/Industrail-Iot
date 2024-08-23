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

const AddDevice = () => {

    const [loading, setLoading] = useState(false);

    // Separate state variables for each select input
    const [deviceType, setDeviceType] = useState('');
    const [admin, setAdmin] = useState('');
    const [location, setLocation] = useState('');
    const [action, setAction] = useState('');

    // Handle change events for each select input
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

    const handleClick = () => {
        setLoading(true);

        setTimeout(() => {
            console.log("Data saved!");
            setLoading(false);
        }, 2000);
    };

    return (
        <div className="menu-data">
            <div className="add-device">
                <form action="">
                    <label htmlFor="" className="label">Device Info</label>
                    <Box sx={{ width: '300%', backgroundColor: "#ebebeb", marginBottom: '20px' }}>
                        <TextField
                            fullWidth
                            label="Name"
                        />
                    </Box>
                    <label htmlFor="" className="label">Label</label>
                    <Box sx={{ width: '300%', backgroundColor: "#ebebeb", marginBottom: '20px' }}>
                        <TextField
                            fullWidth
                            label="Label"
                        />
                    </Box>
                    <label htmlFor="" className="label">Type</label>
                    <FormControl sx={{ marginBottom: "20px", minWidth: 120, display: "block", width: "100%" }}>
                        <InputLabel id="device-type-label">Select Type</InputLabel>
                        <Select
                            labelId="device-type-label"
                            id="device-type-select"
                            value={deviceType}
                            label="Select Type"
                            onChange={handleDeviceTypeChange}
                            sx={{ width: "300%", backgroundColor: "#ebebeb" }}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>1</MenuItem>
                            <MenuItem value={20}>2</MenuItem>
                            <MenuItem value={30}>3</MenuItem>
                        </Select>
                    </FormControl>
                    <label htmlFor="" className="label">Admin</label>
                    <FormControl sx={{ marginBottom: "20px", minWidth: 120, display: "block", width: "100%" }}>
                        <InputLabel id="admin-label">Select User</InputLabel>
                        <Select
                            labelId="admin-label"
                            id="admin-select"
                            value={admin}
                            label="Select User"
                            onChange={handleAdminChange}
                            sx={{ width: "300%", backgroundColor: "#ebebeb" }}
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
                    <FormControl sx={{ marginBottom: "20px", minWidth: 120, display: "block", width: "100%" }}>
                        <InputLabel id="location-label">Select Location</InputLabel>
                        <Select
                            labelId="location-label"
                            id="location-select"
                            value={location}
                            label="Select Location"
                            onChange={handleLocationChange}
                            sx={{ width: "300%", backgroundColor: "#ebebeb" }}
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
                    <FormControl sx={{ marginBottom: "20px", minWidth: 120, display: "block", width: "100%" }}>
                        <InputLabel id="action-label">Select Action</InputLabel>
                        <Select
                            labelId="action-label"
                            id="action-select"
                            value={action}
                            label="Select Action"
                            onChange={handleActionChange}
                            sx={{ width: "300%", backgroundColor: "#ebebeb" }}
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
                            sx={{ width: '150px', height: '50px' }}
                        >
                            <span>Save</span>
                        </LoadingButton>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddDevice;
