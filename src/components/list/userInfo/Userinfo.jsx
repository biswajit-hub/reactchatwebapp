import { useState } from "react";
import { useUserStore } from "../../../lib/userStore";
import EditUser from "./editUser/EditUser";
import Menu from "./menu/Menu";
import "./userInfo.css"

const Userinfo = () => {
    const [editMode, setEditMode] = useState(false);
    const [menuMode, setMenuMode] = useState(false);
    const {currentUser} = useUserStore();
    return (
        <div className="userInfo">
            <div className="user">
                <img src={currentUser.avatar || "./avatar.png"} alt="" />
                <h2>{currentUser.username}</h2>
            </div>
            <div className="icons">
                <img src="./more.png" alt="" onClick={() => setMenuMode((prev) => !prev)} />
                <img src="./video.png" alt="" />
                <img src="./edit.png" alt="" 
                onClick={() => setEditMode((prev) => !prev) } 
                />
            </div>
            {editMode && <EditUser />}
            {menuMode && <Menu />}
        </div>
    )
}

export default Userinfo;