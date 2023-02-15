import { Link } from "react-router-dom"
import {auth} from "../config/firebase"
import {useAuthState} from "react-firebase-hooks/auth" //for gettin user id
import { signOut } from "firebase/auth"


export const Navbar =()=>{
    const [user] =useAuthState(auth);

    const signUserOut = async ()=>{
        await signOut(auth);
    };

    return <div className="navbar">
    <div className="links">
        <Link to={"/"}>Home</Link>
        {!user ? (<Link to={"/login"}>Login</Link>) :
        (<Link to={"/createpost"}>Post+</Link>)}
    </div>    
        <div className="user"> 
        {user && (
        <>
            <p className="font"> {user?.displayName}</p>
            <img alt="its user pfp "src={user?.photoURL || ""} width="50" height={50} />
            {/* <p className="font"> {auth.currentUser?.displayName}</p>
            <img src={auth.currentUser?.photoURL || ""} width="100" height={100}/> */}
            <button className="links" onClick={signUserOut}>Sign Out</button>
            </>)}
        </div>
    </div>
}