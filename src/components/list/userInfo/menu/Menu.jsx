import { auth } from "../../../../lib/firebase";
import "./menu.css"

const handleLogout = () => {
    auth.signOut();
}

const Menu = () => {
    return (
        <div className="menu">
            <button className="logout" onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Menu;