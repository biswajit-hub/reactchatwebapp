import { doc, setDoc } from "firebase/firestore";
import { useUserStore } from "../../../../lib/userStore";
import "./editUser.css"
import upload from "../../../../lib/upload";
import { useState } from "react";
import { toast } from "react-toastify";
import { db } from "../../../../lib/firebase";

const EditUser = () => {

    const [loading, setLoading] = useState(false);

    const [avatarnew, setAvatarnew] = useState({
        file:null,
        url:""
    })
    const {currentUser} = useUserStore();

    const handleAvatar = (e) => {
        if(e.target.files[0]){
            setAvatarnew({
                file:e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            });
            console.log(e);
        }
    };

    const handleRegister = async (e) => {
        setLoading(true);
        e.preventDefault();
        const formData = new FormData(e.target)
        const {username, email, password} = Object.fromEntries(formData)
        try{
            // const res = await createUserWithEmailAndPassword(auth, email, password)
            let imgUrl = "";
            if(avatarnew.file){
                imgUrl = await upload(avatarnew.file);
            }

            await setDoc(doc(db, "users", currentUser.id), {
                username,
                email: currentUser.email,
                avatar: imgUrl,
                id: currentUser.id,
                blocked: currentUser.blocked,
            });

            toast.success("Account Details Updated!")

        } catch (err) {
            console.log(err)
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="editUser">
            <h2>Edit Account</h2>
                <form onSubmit={handleRegister}>
                    <label htmlFor="file">
                        <img src={avatarnew.url || currentUser.avatar || "./avatar.png"} alt="" />
                        Upload an image
                    </label>
                    <input type="file" id="file" style={{display:"none"}} onChange={handleAvatar} />
                    <input type="text" placeholder="Username" name="username" defaultValue={currentUser.username ? currentUser.username : ""} />
                    {/* <input type="text" placeholder="Email" name="email" /> */}
                    <button disabled={loading}>{loading ? "Loading...":"Update"}</button>
                </form>
        </div>
    )
}

export default EditUser;