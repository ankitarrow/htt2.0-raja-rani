import React, { useEffect, useState } from 'react';
import './Chat.css';
import ChatHeader from './ChatHeader';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import GifIcon from '@mui/icons-material/Gif';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import Message from './Message';
import { useSelector } from 'react-redux';
import { selectChannelId, selectChannelName } from './features/appSlice';
import { selectUser } from './features/userSlice';
import { db } from './firebase'; // Correct import statement

function Chat() {
  const channelId = useSelector(selectChannelId);
  const user = useSelector(selectUser);
  const channelName = useSelector(selectChannelName);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (channelId) {
      db.collection('channels')
        .doc(channelId)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .onSnapshot(snapshot =>
          setMessages(snapshot.docs.map(doc => doc.data()))
        );
    }
  }, [channelId]);

  const sendMessage = e => {
    e.preventDefault();

    db.collection('channels')
      .doc(channelId)
      .collection('messages')
      .add({
        timestamp: new Date(), // Use current timestamp or another valid timestamp
        message: input,
        user: user || {},
      });

    setInput('');
  };

  return (
    <div className="chat">
      <ChatHeader channelName={channelName} />
      <div className="chat__messages">
        {messages.map((message, index) => (
          <Message
            key={index}
            timestamp={message.timestamp}
            user={message.user}
            message={message.message}
          />
        ))}
      </div>

      <div className="chat__input">
        <AddCircleIcon fontSize="large" />
        <form>
          <input
            value={input}
            disabled={!channelId}
            onChange={e => setInput(e.target.value)}
            placeholder={`Message #${channelName}`}
          />
          <div className="chat__inputButton">
            <button
              disabled={!channelId}
              className="chat__inputButton"
              type="submit"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </form>

        <div className="chat__inputIcons">
          <CardGiftcardIcon fontSize="large" />
          <GifIcon fontSize="large" />
          <EmojiEmotionsIcon fontSize="large" />
        </div>
      </div>
    </div>
  );
}

export default Chat;
