import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import SidebarChannel from './SidebarChannel';
import { Avatar } from '@mui/material';
import { selectUser } from './features/userSlice';
import { useSelector } from 'react-redux';
import db, { auth } from './firebase'; // Import auth from firebase

function Sidebar() {
  const user = useSelector(selectUser);
  console.log(user);
    const [channels, setChannels] = useState([]);

  const handleLogout = () => {
    auth.signOut(); 
  };

  useEffect(() =>{
    db.collection('channels').onSnapshot((snapshot) => 
        setChannels(
            snapshot.docs.map((doc) => ({
                id: doc.id,
                channel: doc.data(), 
        }))
    ));
  }, [])

  const handleAddChannel = () => {
    const channelName = prompt('Enter a new Channel name: ');

    if (channelName){
        db.collection('channels').add({
            channelName: channelName,
        });
    }
  }

  return (
    <div className='sidebar'>
      <div className="sidebar__top">
        <h3>Community Chat</h3>
        <ExpandMoreIcon />
      </div>
      <div className="sidebar__channels">
        <div className="sidebar__channelsHeader">
          <div className="sidebar__header">
            <ExpandMoreIcon />
            <h4>Channels</h4>
          </div>
          <AddIcon onClick={handleAddChannel} className="sidebar__addChannel"></AddIcon>
        </div>
        <div className="sidebar__channelsList">
            {channels.map(({id, channel }) =>(
                <SidebarChannel key={id} id={id} channelName={channel.channelName} />
            ) )}
        </div>
      </div>
      <div className="sidebar__profile">
        <Avatar onClick={handleLogout} src={user.photo} />
        <div className="sidebar__profileInfo">
          <h3>{user.displayName}</h3>
          <p>{user.uid.substring(0, 5)}</p>
        </div>
        <div className="sidebar__profileIcons"></div>
      </div>
    </div>
  );
}

export default Sidebar;
