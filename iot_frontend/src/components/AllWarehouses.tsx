// AllWarehouses.tsx
import React, { useEffect, useState } from 'react';
import '../styles/AllWarehouse.css'

interface Warehouse {
    _id: string;
    warehouse_id: string;
    warehouse_name: string;
    location: string;
    // Add other relevant fields here
}

const AllWarehouses: React.FC = () => {
    const [allWarehouses, setAllWarehouses] = useState<Warehouse[]>([]);
    const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(null);

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

    const handleWarehouseClick = (warehouse: Warehouse) => {
        setSelectedWarehouse(warehouse);
    };

    const handleBackClick = () => {
        setSelectedWarehouse(null);
    };

    return (
        <div className="container">
            {selectedWarehouse ? (
                <div className="warehouse-details">
                    <h1>Warehouse Details</h1>
                    <p><strong>ID:</strong> {selectedWarehouse.warehouse_id}</p>
                    <p><strong>Name:</strong> {selectedWarehouse.warehouse_name}</p>
                    <p><strong>Location:</strong> {selectedWarehouse.location}</p>
                    {/* Add other fields as needed */}
                    <button onClick={handleBackClick} className="back-button">Back to List</button>
                </div>
            ) : (
                <>
                    <h1 className="title">Warehouses</h1>
                    <ul className="warehouse-list">
                        {allWarehouses.map((warehouse) => (
                            <li key={warehouse._id} className="warehouse-item" onClick={() => handleWarehouseClick(warehouse)}>
                                <div className="warehouse-header">
                                    <strong>Warehouse ID:</strong> {warehouse.warehouse_id}
                                </div>
                                <div className="warehouse-body">
                                    <strong>Warehouse Name:</strong> {warehouse.warehouse_name}
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default AllWarehouses;
