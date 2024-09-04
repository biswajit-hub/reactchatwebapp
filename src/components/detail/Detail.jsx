import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useChatStore } from "../../lib/chatStore";
import { auth, db } from "../../lib/firebase";
import { useUserStore } from "../../lib/userStore";
import "./detail.css"
import { useState } from "react";

const Detail = () => {
    const [ sharedPhotoMode, setSharedPhotoMode ] = useState(false);

    const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } = useChatStore();
    const { currentUser } = useUserStore();

    const handleBlock = async () => {
        if(!user) return;

        const userDocRef = doc(db, "users", currentUser.id);


        try{
            await updateDoc(
                userDocRef, {
                    blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
                }
            );
            changeBlock();
        } catch (err) {
            console.log(err);
        }
    }

    const handleLogout = () => {
        auth.signOut();

    }

    const handleSharedPhoto = () => {
        setSharedPhotoMode(!sharedPhotoMode);
        // const photos = document.querySelectorAll('.photos');
        const photos = document.querySelector('.photos');
        if(sharedPhotoMode){
            photos.style.display = "none";
        }else{
            photos.style.display = "flex";
        }
        // console.log(photos);
    }

    return (
        <div className="detail">
            <div className="user">
                <img src={user?.avatar || "./avatar.png"} alt="" />
                <h2>{user?.username}</h2>
                <p>Lorem ipsum dolor sit.</p>
            </div>
            <div className="info">
                <div className="option">
                    <div className="title">
                        <span>Chat Settings</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Privacy & help</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Shared Photos</span>
                        <img src={sharedPhotoMode?  "./arrowDown.png" : "./arrowUp.png"} alt="" onClick={handleSharedPhoto}/>
                    </div>
                    <div className="photos">
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="https://images.pexels.com/photos/27438918/pexels-photo-27438918/free-photo-of-a-beach-with-rocks-and-sand-at-sunset.jpeg" alt="" />
                                <span>photo_2024_2.png</span>
                            </div>
                            <img src='./download.png' alt="" className="icon" />
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="https://images.pexels.com/photos/27438918/pexels-photo-27438918/free-photo-of-a-beach-with-rocks-and-sand-at-sunset.jpeg" alt="" />
                                <span>photo_2024_2.png</span>
                            </div>
                            <img src='./download.png' alt="" className="icon" />
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="https://images.pexels.com/photos/27438918/pexels-photo-27438918/free-photo-of-a-beach-with-rocks-and-sand-at-sunset.jpeg" alt="" />
                                <span>photo_2024_2.png</span>
                            </div>
                            <img src='./download.png' alt="" className="icon" />
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="https://images.pexels.com/photos/27438918/pexels-photo-27438918/free-photo-of-a-beach-with-rocks-and-sand-at-sunset.jpeg" alt="" />
                                <span>photo_2024_2.png</span>
                            </div>
                            <img src='./download.png' alt="" className="icon" />
                        </div>
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Shared Files</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>
                </div>
                <button onClick={handleBlock}>{
                        isCurrentUserBlocked 
                    ? 
                        "You are Blocked!" 
                    : 
                            isReceiverBlocked 
                        ?
                           "User Blocked!" 
                        : 
                            "Block User"
                    }</button>
                <button className="logout" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}

export default Detail;