import React, { useState } from 'react';

interface VehicleData {

}

const AddVehicle: React.FC = () => {
  
  const [formData, setFormData] = useState<VehicleData>({

  })

  const [submitted, setSubmitted] = useState<boolean>(false);


  const handleReset = () => {
    setFormData({
      sensor_id: '',
      indoor_location: '',
      Type: [],
      date_of_installation: ''
    });
    setSubmitted(false);
  }


  return (
    <div className="form-container">
      <h1>Add Vehicle</h1>
      {
        submitted ? (
          <div className="success-message">
            <p>Sensor added successfully!</p>
            <button className="reset-button" onClick={handleReset}>Add Another Vehicle</button>
          </div>
        ) : (
          <div>

          </div>
        )
      }
    </div>
  )
}

export default AddVehicle