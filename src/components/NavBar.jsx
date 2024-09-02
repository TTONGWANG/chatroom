import React from 'react'
import {signOut} from "firebase/auth"
import { auth } from '../firebase'
import { useContext } from "react";
import { AuthContext } from "../context";

export default function NavBar() {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className='navbar'>
      <span className="logo">chat</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button onClick={() =>signOut(auth)}>Logout</button>
      </div>
    </div>
  )
}
