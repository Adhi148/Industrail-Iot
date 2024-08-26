import "./users.css"
import { useEffect } from "react";
import { getUsers } from "../../api/userApi";


const Users = () => {

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getUsers(0);
                console.log(userData.data);
            } catch (error) {
                console.error('Failed to fetch user data', error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className="menu-data">
            <div className="users">
                
            </div>
        </div>
    )
}

export default Users