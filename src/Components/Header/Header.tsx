import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";
import "../Menu-bar/Menubar.css";
import { useEffect, useState, useRef } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LogoutIcon from '@mui/icons-material/Logout';

const Header: React.FC = () => {
    const location = useLocation();
    const [username, setUsername] = useState<string | null>(null);
    const [toggle, setToggle] = useState<string>("hidden");
    const navigate = useNavigate();
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const stateUsername = location.state?.state || null;
        const storedUsername = localStorage.getItem('username');
        setUsername(stateUsername || storedUsername);
    }, [location.state]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setToggle('hidden');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleVisible = (): void => {
        setToggle(prev => (prev === 'hidden' ? 'visible' : 'hidden'));
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <div className="header">
            <div className="logo">Myoorja</div>
            <Link to="/dashboard" className="link link2">
                <li>Home</li>
            </Link>
            <div className="account">
                <li>
                    <AccountCircleIcon className="accounticon" /> <span>{username}</span>
                </li>
                <li className="menuu" onClick={handleVisible}>
                    <MoreVertIcon />
                    <div className={`menu ${toggle}`} ref={menuRef}>
                        <Link className="link2" to="">
                            <AccountCircleIcon /><span>Account</span>
                        </Link>
                        <Link className="link2" to="" onClick={handleLogout}>
                            <LogoutIcon /> <span>Logout</span>
                        </Link>
                    </div>
                </li>
            </div>
        </div>
    );
};

export default Header;
