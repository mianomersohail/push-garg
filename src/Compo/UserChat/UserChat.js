// ChatComponent.js
import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer'


const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { name } = location.state?.Data || {};
  const deletesession = () => {
    localStorage.removeItem('token');
    navigate('/userlogin');
};
const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
};
  // Handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, sender: 'user' }]);
      setNewMessage('');
    }
  };
 

  return (
    <>
     <div className="container offset-lg-1">
                    <div className="row nav-row">
                        <div className="col-lg-4 nav-main">
                            <div className="nav-flex">
                                <img
                                    className="nav-first-img"
                                    src="https://media.licdn.com/dms/image/v2/D5603AQHNxqJ-f0xuuQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1726896992279?e=1732752000&v=beta&t=OKZ_z1ZLv_AIjc9CqeqXcTbHBEy6M9o2foOgHYbIMaY"
                                    alt="Profile"
                                />
                                <p className="nav-bold">{name || 'WELCOME'}</p>
                            </div>
                            <div className="hamburger" onClick={toggleMenu}>
                                {isMenuOpen ? '✕' : '☰'}
                            </div>
                            <ul className={`nav-first-li ${isMenuOpen ? 'open' : ''}`}>
                                <li><i className="fas fa-envelope" onClick={''}></i></li>
                                <li className="nav-first-li-second" onClick={deletesession}>
                                    Sign Out
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
    <Box
      sx={{
        maxWidth: '400px',
        margin: 'auto',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #ccc',
        borderRadius: '8px',
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
      }}
    >
      {/* Chat messages area */}
      <Box
        sx={{
          flexGrow: 1,
          padding: '16px',
          overflowY: 'auto',
        }}
      >
        {messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
              marginBottom: '10px',
            }}
          >
            <Box
              sx={{
                padding: '10px',
                borderRadius: '15px',
                backgroundColor: message.sender === 'user' ? '#06B6D4' : '#ddd',
                color: message.sender === 'user' ? '#fff' : '#000',
                maxWidth: '70%',
                wordWrap: 'break-word',
              }}
            >
              {message.text}
            </Box>
          </Box>
        ))}
      </Box>

      {/* Input area */}
      <Box
        sx={{
          display: 'flex',
          padding: '10px',
          borderTop: '1px solid #ccc',
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSendMessage();
          }}
        />
        <Button
          sx={{ marginLeft: '10px' }}
          variant="contained"
          color="primary"
          onClick={handleSendMessage}
        >
          <SendIcon />
        </Button>
      </Box>
    </Box>
    <Footer/>
    </>
  );
};

export default ChatComponent;
