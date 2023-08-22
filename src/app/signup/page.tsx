'use client'
import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import axios from "axios"
const Signup =()=>{
    const [user, setUser]=React.useState({
        email:"",
        password:"",
        userName:""


    })
    const onSignup=async()=>{

    }
return(
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>Signup page</h1>
        <hr/>
        <label htmlFor="userName">User Name:   </label>
        <input    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="userName"
        type="text"
        value={user.userName}
        onChange={(e)=>setUser({...user, userName:e.target.value})}
        placeholder="Name"/>
     
            <label htmlFor="email">Email: </label>

        <input    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="email"
        type="email"
        value={user.email}
        onChange={(e)=>setUser({...user, email:e.target.value})}
        placeholder="Email"/>
       
        <label htmlFor="password">Password:</label>
        <input    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="password"
        type="password"
        value={user.password}
        onChange={(e)=>setUser({...user, password:e.target.value})}
        placeholder="PAssword"/>
        <button  className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        onClick={onSignup}>Signup here</button>
        <Link href="/login">You have an account</Link>
        
    </div>
)

}
export default Signup