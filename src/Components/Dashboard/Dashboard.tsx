import { useLocation } from "react-router-dom";
import "./Dashboard.css"

const Dashboard = () => {

    const accountinfo = useLocation();
    console.log(accountinfo)
    
    return (
        <>
            <div className="menu-data">
                Dashboard
            </div>
        </>
    )
}

export default Dashboard