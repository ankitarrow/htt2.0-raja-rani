import React, { useEffect } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import { selectUser} from "./features/userSlice"
import {useDispatch, useSelector } from 'react-redux';
import Login from './Login';
import { auth } from './firebase';
import {login, logout} from "./features/userSlice";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("user is ", authUser);
      if (authUser) {
        //logged in
        dispatch(login({
          uid:authUser.uid,
          photo: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName,
        }))
      } else{
        //logged out
        dispatch(logout());
        dispatch(logout());
      }
    });
  }, [dispatch])
  return (
    <div className="app">
      {user ? (
        <>
        {/* Sidebar */}
      <Sidebar />


      {/* Chat */}
      <Chat />
      </>
      ): (
        <Login />
      )}
      
    </div>
  );
}

export default App;
