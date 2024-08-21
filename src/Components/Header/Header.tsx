import { Link, NavLink } from "react-router-dom"
import "./Header.css"
import "../Menu-bar/Menubar.css"

const Header = () => {
    return (
        <div className="header">
            <div className="logo">Myoorja</div>
            <Link to="" className="link link2">
                <li>Home</li>
            </Link>
            <NavLink to="/login" className="link link2">
                <li>Account</li>
            </NavLink>
        </div>
    )
}

export default Header