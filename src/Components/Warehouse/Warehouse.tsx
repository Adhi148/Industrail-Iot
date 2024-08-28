import { useEffect, useState } from "react";
import "./Warehouse.css";
import WarehouseIcon from '@mui/icons-material/Warehouse';

interface Warehouse {
    _id: string;
    warehouse_id: string;
    warehouse_name: string;
    location: string;
    latitude: string;
    longitude: string;
}

interface LocationInfo {
    display_name: string;
}

const Warehouse = () => {
    const [allWarehouses, setAllWarehouses] = useState<Warehouse[]>([]);
    const [locationInfo, setLocationInfo] = useState<{ [key: string]: LocationInfo | null }>({});
    const [error, setError] = useState<{ [key: string]: string | null }>({});

    const fetchAllWarehouses = async () => {
        try {
            const response = await fetch('http://localhost:2000/warehouse/getallwarehouse');
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const data: Warehouse[] = await response.json();
            setAllWarehouses(data);
        } catch (error) {
            console.error("Failed to fetch warehouses:", error);
        }
    };

    useEffect(() => {
        fetchAllWarehouses();
    }, []);

    useEffect(() => {
        const fetchLocationInfo = async (latitude: string, longitude: string, warehouseId: string) => {
            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch location data');
                }

                const data: LocationInfo = await response.json();
                setLocationInfo(prevState => ({ ...prevState, [warehouseId]: data }));
            } catch (err) {
                setError(prevState => ({ ...prevState, [warehouseId]: err.message }));
            }
        };

        allWarehouses.forEach(warehouse => {
            if (warehouse.latitude && warehouse.longitude) {
                fetchLocationInfo(warehouse.latitude, warehouse.longitude, warehouse._id);
            }
        });
    }, [allWarehouses]);

    console.log(allWarehouses);

    return (
        <div className="menu-data">
            <div className="warehouses">
                {allWarehouses.map((warehouse) => (
                    <div className="userinfo" key={warehouse._id}>
                        <div className="user-img-info">
                            <div className="img">
                                <WarehouseIcon className="personicon" />
                            </div>
                            <div className="status">
                                <p className="username">{warehouse.warehouse_name}</p>
                                <p>{warehouse.warehouse_id}</p>
                                <p className="location">{locationInfo[warehouse._id]?.display_name || "Loading location..."}</p>
                                {error[warehouse._id] && <p className="error">Error: {error[warehouse._id]}</p>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Warehouse;
