import "./Menubar.css"
import SpeedIcon from '@mui/icons-material/Speed';
import PieChartIcon from '@mui/icons-material/PieChart'; 
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import CableIcon from '@mui/icons-material/Cable';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GroupIcon from '@mui/icons-material/Group';
import { Link } from "react-router-dom";
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import AddIcon from '@mui/icons-material/Add';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import { useEffect, useState} from "react";
import { getUsers } from "../../api/userApi";
import { Device, DeviceQueryParams, PageData } from "../../types/thingsboardTypes";
import { getTenantDevices } from "../../api/deviceApi";

interface user {
    email: string,
    additionalInfo: any
    lastLoginTs: number
}
const Menubar = () => {
    
    useEffect(() => {
        document.body.style.overflowX = 'hidden';
        return () => {
            document.body.style.overflowX = '';
        };
    }, []);

    const [userdata, setUserdata] = useState<user[]>([]);
    const [devices, setDevices] = useState<Device[]>([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getUsers(0);
                console.log(userData.data);
                setUserdata(userData.data);
            } catch (error) {
                console.error('Failed to fetch user data', error);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
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
                setDevices(response.data || []);


            } catch (error) {
                console.error('Failed to fetch devices', error);
            }
        };

        fetchDevices(0)
    }, [])
    

 


    return (
        <>
            <div className="side-bar">
                <div className="Menu">
                    <p>Menu</p>
                </div>
                <ul>
                    <Link to="/dashboard" className="link">
                        <li><SpeedIcon className="speedicon" />DashBoard </li>
                    </Link>
                    <Link to="/charts" className="link">
                        <li><PieChartIcon className="speedicon" />Charts</li>
                    </Link>
                    <Link to="/actions" className="link">
                        <li><ElectricBoltIcon className="speedicon" />Actions <span className="count">3</span></li>
                    </Link>
                    <Link to="/devices" className="link">
                        <li><CableIcon className="speedicon" />Devices <span className="count">{devices.length}</span></li>
                    </Link>
                    <Link to="/locations" className="link">
                        <li><LocationOnIcon className="speedicon" />Locations <span className="count">3</span></li>
                    </Link>
                    <Link to="/warehouses" className="link">
                        <li><WarehouseIcon className="speedicon" />Warehouses <span className="count">10</span></li>
                    </Link>
                    <Link to="/vehicles" className="link">
                        <li><LocalShippingIcon className="speedicon" />Vehicles <span className="count">3</span></li>
                    </Link>
                    <Link to="/users" className="link">
                        <li><GroupIcon className="speedicon" />Users <span className="count">{userdata.length}</span></li>
                    </Link>
                    <li className="quick-action">Quick Actions</li>
                    <Link to="/addDevice" className="link">
                        <li><AddToQueueIcon className="speedicon" />Add Device</li>
                    </Link>
                    <Link to="/addAction" className="link">
                        <li><AddIcon className="speedicon" />Add Action</li>
                    </Link>
                    <Link to="/addLocation" className="link">
                        <li><AddLocationIcon className="speedicon" />Add Location</li>
                    </Link>
                    <Link to="/addWarehouse" className="link">
                        <li><AddIcon className="speedicon" />Add Warehouse</li>
                    </Link>
                    <Link to="/addVehicle" className="link">
                        <li><AddIcon className="speedicon" />Add Vehicle</li>
                    </Link>
                    <Link to="/addUser" className="link">
                        <li><PersonAddAlt1Icon className="speedicon" />Add User</li>
                    </Link>
                    <Link to="/testComponent" className="link">
                        <li><PersonAddAlt1Icon className="speedicon" />My Component</li>
                    </Link>
                </ul>
            </div>
        </>
    )
}

export default Menubar