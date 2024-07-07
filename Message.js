import React from 'react';
import './Message.css';
import { Avatar } from '@mui/material';

function Message({ timestamp, user, message }) {
  return (
    <div className="message">
      {user && user.photo ? ( // Check if user and user.photo exist before accessing
        <Avatar src={user.photo} />
      ) : (
        <Avatar /> // Placeholder if photo is not available
      )}
      <div className="message__info">
        <h4>
          {user ? user.displayName : 'Unknown User'} {/* Display user's display name or 'Unknown User' */}
          <span className="message__timestamp">
            {timestamp ? new Date(timestamp?.toDate()).toUTCString() : ''}
          </span>
        </h4>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Message;
