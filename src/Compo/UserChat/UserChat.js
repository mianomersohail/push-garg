// ChatComponent.js
import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useLocation, useNavigate } from 'react-router-dom';
const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { name } = location.state?.Data || {};

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, sender: 'user' }]);
      setNewMessage('');
    }
  };
  return (
    <>
    <div className='container'>
      <div className='row'>
        <div className='offset-lg-2'>
          <span style={{color:'#06B6D4',fontSize:'32px'}}>L</span><span>EAVE</span><span style={{color:"#06B6D4",fontSize:"32px"}}>Y</span><span>OUR</span><span style={{color:"#06B6D4",fontSize:"32px"}}>M</span><span>ESSAGE</span>
 
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
          marginTop:'50px',
          backgroundColor: '#f0f0f0'
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
    </>
  );
};

export default ChatComponent;
