import { useState } from "react";
import { useNavigate, Link } from "react-router";
import "../style/login.scss";
import FormGroup from "../components/FormGroup";
import {useAuth} from '../hook/useAuth'


const Login = () => {

    const navigate = useNavigate()
   
    const{loading ,handleLogin} = useAuth()

    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')


    const handleSubmit = async (e)=>{
        e.preventDefault()
        await handleLogin({email,password})
       navigate('/')
    }


    return (
        <main className="login-page">
            <div className="form-container">
                <h1>Login</h1>
               
                <form onSubmit={handleSubmit}>
                    
                    <FormGroup value ={email} onChange={(e)=>setEmail(e.target.value)} label="Email" placeholder="Enter you email" />
                    <FormGroup value={password} onChange={(e)=>setPassword(e.target.value)} label="Password" placeholder="Enter you password" />

                    <button  className="button" >Login </button>

                    <p className="form-footer">
                        Account nahi hai? <Link to="/register">Register</Link>
                    </p>
                </form>
            </div>
        </main>
    );
};

export default Login;
 //yeh form group email passworddono ke liye repeat ho rh and register m bhi hoga repeat 
                    // so components handle krenge yeh 
                    {/* <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                        />
                    </div> */}