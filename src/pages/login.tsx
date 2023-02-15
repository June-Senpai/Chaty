import {auth,provider} from "../config/firebase" //config file pe auth
import { signInWithPopup } from "firebase/auth" //google sign in pops up
import { useNavigate } from "react-router-dom" //after loginin re-direct to home

export const Login=()=> {

    const navigate=useNavigate();

    const signInWithGoogle= async ()=>  //instead of usiin promised used async
    {
       const result= signInWithPopup(auth,provider)
       console.log(result)  //for checkin user info
       navigate('/'); //after signing is done it navigates to home
    }

    return (
    <div className="font"> 
        Login Page
        <h3>Sign In with google</h3>
        <button className="font" onClick={signInWithGoogle}>Sign in using google</button>
    </div>)
}