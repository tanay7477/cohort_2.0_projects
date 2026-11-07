import {useAuth} from '../hook/useAuth'
import {useNavigate , Navigate} from 'react-router'
import{useEffect } from 'react'

const Protected = ({children})=>{

    const{user,loading} = useAuth()  
    
    const navigate = useNavigate()

    

    // useEffect()

    if(loading){
        return<h1>loading...</h1>
    }
    if(!loading  && !user){
       return <Navigate to="/login"/>
    }


    return children
}

export default Protected