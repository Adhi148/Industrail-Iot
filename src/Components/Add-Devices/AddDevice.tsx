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
import { Device, DeviceQueryParams, PageData } from "../../types/thingsboardTypes";
import { saveDevice, getTenantDevices } from "../../api/deviceApi";
import Loader from "../Loader/Loader";
import { useDispatch } from "react-redux";
import { set_DeviceCount } from "../../Redux/Action/Action";
import { Snackbar, SnackbarCloseReason, SnackbarContent } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';

const AddDevice = () => {
    const [loading, setLoading] = useState(false);
    const [deviceType, setDeviceType] = useState('default');
    const [admin, setAdmin] = useState('');
    const [location, setLocation] = useState('');
    const [action, setAction] = useState('');
    const [deviceName, setDeviceName] = useState('');
    const [label, setLabel] = useState('');
    const [loaders, setLoaders] = useState(true);
    const deviceCountDispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [snackbarType, setSnackbarType] = useState<'success' | 'error'>('success');


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
    }, 1000);


    const fetchDevices = async (page: number): Promise<void> => {
        try {

            const params: DeviceQueryParams = {
                pageSize: 10,
                page: page,
                type: 'default',
                textSearch: '',
                sortProperty: 'name',
                sortOrder: 'ASC',
            };

            const response: PageData<Device> = await getTenantDevices(params);
            deviceCountDispatch(set_DeviceCount(response.totalElements || 0));
        } catch (error) {
            console.error('Failed to fetch devices', error);
        }
    };

    const handleClick = async () => {
        setLoading(true);

        try {
            const newDevice: Device = {
                name: deviceName,
                type: deviceType,
            };

            await saveDevice(newDevice);
            await fetchDevices(0);

            setTimeout(() => {
                setDeviceName('');
                setDeviceType('default');
                setAdmin('');
                setLocation('');
                setAction('');
                setLabel('');
                setLoading(false);
                setMessage("Device added successfully!");
                setSnackbarType('success');
                setOpen(true);
            }, 500);
        } catch (error) {
            console.log('Failed to create device');
            setTimeout(() => {
                setLoading(false);
                setMessage("Device Already Exist");
                setSnackbarType('error');
                setOpen(true);
            }, 500)
        }
    };


    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            event
            return;
        }

        setOpen(false);
    };



    return (
        <>
            {
                loaders ? (<Loader />) : (
                    <div className="menu-data">
                        <div className="add-device">
                            <form>
                                <label htmlFor="" className="label">Device Info</label>
                                <Box className="text-field-box">
                                    <TextField
                                        fullWidth
                                        label="Name"
                                        onChange={(e) => setDeviceName(e.target.value)}
                                        value={deviceName}
                                    />
                                </Box>
                                <label htmlFor="" className="label">Label</label>
                                <Box className="text-field-box">
                                    <TextField
                                        fullWidth
                                        label="Label"
                                        onChange={(e) => setLabel(e.target.value)}
                                        value={label}
                                        className="textfiled"
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
                                        <MenuItem value={"Temperature"}>Temperature</MenuItem>
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
                        <Snackbar
                            open={open}
                            autoHideDuration={2000}
                            onClose={handleClose}
                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            style={{ marginTop: '64px' }}
                        >
                            <SnackbarContent
                                style={{
                                    backgroundColor: snackbarType === 'success' ? 'green' : 'red',
                                    color: 'white'
                                }}
                                message={
                                    <span style={{ display: 'flex', alignItems: 'center' }}>
                                        {snackbarType === 'success' ? <CheckIcon style={{ marginRight: '8px' }} /> : <ErrorIcon style={{ marginRight: '8px' }} />}
                                        {message}
                                    </span>
                                }
                            />
                        </Snackbar>
                    </div>
                )
            }
        </>
    );
}

export default AddDevice;
