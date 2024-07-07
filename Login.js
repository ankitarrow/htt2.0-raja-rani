import React from 'react'
import "./Login.css"
import { Button } from '@mui/material'
import { auth, provider } from "./firebase";

function Login() {
    const signIn = () => {
        auth.signInWithPopup(provider)
        .catch((error) => alert(error.message));
    }
  return (
    <div className='login'>
        <div className="login__logo">
           <img src="https://ik.imagekit.io/uunnv9icj/WhatsApp%20Image%202024-03-23%20at%2018.52.12_3633848c.jpg?updatedAt=1711259441438"
            alt="logo" />
        </div>
        <Button onClick={signIn}>Sign In</Button>
    </div>
  )
}

export default Login