import '../style/register.scss'
import { useNavigate, Link } from "react-router";
import {useState} from 'react'
import FormGroup from "../components/FormGroup";
import {useAuth} from '../hook/useAuth'


const Register= ()=>{

    const navigate = useNavigate()


   const[username , setuserName] = useState("")
   const[email, setEmail] = useState("")
   const[password, setPassword] = useState("")

   const{loading , handleRegister} = useAuth()

    async function handleSubmit(e){
        e.preventDefault()

        await handleRegister({username , email , password})
        navigate('/')
    }

    return (
         <main className="register-page">
                    <div className="form-container">
                        <h1>Register</h1>
                       
                        <form onSubmit={handleSubmit}>
                            <FormGroup value={username} onChange={(e)=>{setuserName(e.target.value)}}
                            label="Username" placeholder="Enter you Username" />
                            
                            <FormGroup value={email} onChange={(e)=>{setEmail(e.target.value)}}
                            label="Email" placeholder="Enter you email" />

                            <FormGroup value={password} onChange={(e)=>{setPassword(e.target.value)}}
                            label="Password" placeholder="Enter you password" />
        
                            <button className="button" >Register </button>
        
                            <p className="form-footer">
                                Already Registered <Link to="/login">Login</Link>
                            </p>
                        </form>
                    </div>
                </main>
    )
}

export default Register