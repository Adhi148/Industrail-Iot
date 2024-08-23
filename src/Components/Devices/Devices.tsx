import "./Devices.css";
import { useEffect, useState } from 'react';
import { Device, DeviceQueryParams, PageData } from '../../types/thingsboardTypes';
import { getTenantDevices } from '../../api/deviceApi';
import Loader from "../Loader/Loader";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check'; // Import the CheckIcon
import thingsboardAPI from '../../api/thingsboardAPI';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import React from "react";
import SnackbarContent from '@mui/material/SnackbarContent';

const Devices: React.FC = () => {
    const [devices, setDevices] = useState<Device[]>([]);
    const [loadingDevices, setLoadingDevices] = useState<boolean>(false);
    const [open, setOpen] = React.useState(false);

    const fetchDevices = async (page: number): Promise<void> => {
        try {
            setLoadingDevices(true);

            const params: DeviceQueryParams = {
                pageSize: 10,
                page: page,
                type: 'default',
                textSearch: '',
                sortProperty: 'name',
                sortOrder: 'ASC',
            };

            const response: PageData<Device> = await getTenantDevices(params);
            setDevices(response.data || []);

            setTimeout(() => {
                setLoadingDevices(false);
            }, 1000);

        } catch (error) {
            console.error('Failed to fetch devices', error);
            setLoadingDevices(false); // In case of error, immediately stop loading
        }
    };

    const deleteDevice = async (deviceId: string): Promise<void> => {
        try {
            await thingsboardAPI.delete(`/device/${deviceId}`);
            fetchDevices(0);
            handleClick();  // Trigger Snackbar on successful deletion
        } catch (error) {
            console.error('Failed to delete device', error);
            throw error;
        }
    };

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    useEffect(() => {
        fetchDevices(0);
    }, []);

    return (
        <div className="menu-data">
            <div className="devices">
                {
                    loadingDevices ?
                        (
                            <Loader />
                        ) :
                        (
                            <>
                                <h2>Devices</h2>
                                <ul>
                                    {
                                        devices.map((device, index) => (
                                            <li key={index}>
                                                {device.name}
                                                <div>
                                                    <IconButton aria-label="edit">
                                                        <EditIcon className="edit-icon" />
                                                    </IconButton>
                                                    <IconButton
                                                        aria-label="delete"
                                                        onClick={() => deleteDevice(device.id?.id)}>
                                                        <DeleteIcon className="delete-icon" />
                                                    </IconButton>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </>
                        )
                }
            </div>
            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                style={{ marginTop: '64px' }} 
            >
                <SnackbarContent
                    style={{ backgroundColor: 'green', color: 'white' }}
                    message={
                        <span style={{ display: 'flex', alignItems: 'center' }}>
                            <CheckIcon style={{ marginRight: '8px' }} />
                            Device deleted successfully
                        </span>
                    }
                />
            </Snackbar>
        </div>
    )
}

export default Devices;
