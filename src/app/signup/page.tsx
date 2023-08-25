'use client'
import React, {useState, useEffect} from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {toast} from "react-hot-toast"
import axios from "axios"
const Signup =()=>{
    const router = useRouter()
    const [user, setUser]=React.useState({
        email:"",
        password:"",
        username:""
    })
    const [buttonDisabled, setButtonDisabled]=React.useState(false)
    const [loading, setLoading] =React.useState(false)
    const onSignup=async()=>{
try {
    setLoading(true)
    const response = await axios.post("/api/users/signup", user, {
        headers: {
          "Content-Type": "application/json", 
        },
      });
    console.log("signup success", response.data)
    router.push("/login")
} catch (error:any) {
    console.log(error.message, "signup failed")
    toast.error(error.message)
}finally{
    setLoading(false)
}
    }
    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0 && user.username.length>0){
            setButtonDisabled(false)
        }else{
            setButtonDisabled(true)
        }
    },[user])
return(
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>{loading? "Progressing": "Signup"}</h1>
        <hr/>
        <label htmlFor="username">User Name:   </label>
        <input    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="username"
        type="text"
        value={user.username}
        onChange={(e)=>setUser({...user, username:e.target.value})}
        placeholder="Name"/>
     
            <label htmlFor="email">Email: </label>

        <input    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="email"
        type="text"
        value={user.email}
        onChange={(e)=>setUser({...user, email:e.target.value})}
        placeholder="Email"/>
       
        <label htmlFor="password">Password:</label>
        <input    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="password"
        type="password"
        value={user.password}
        onChange={(e)=>setUser({...user, password:e.target.value})}
        placeholder="Password"/>
        <button  className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        onClick={onSignup}>{buttonDisabled? "No signup":"Signup"}</button>
        <Link href="/login">You have an account</Link>
        
    </div>
)

}
export default Signup