'use client'

import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { Box, Button, TextField, Stack, Tooltip, Fab, Chip, Paper, Typography } from '@mui/material'
import { ArrowBack, Delete, Send } from '@mui/icons-material'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I am your Rate My Prof AI assistant, Profspector AI. How can I help you today?'
    },
  ])
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async () => {
    // setMessage('')
    if (!message.trim() || isLoading) return;  // Don't send empty messages
    setIsLoading(true)
    
    setMessages((prevMessages) => [
      ...prevMessages, 
      { role: 'user', content: message },
      {role: 'assistant', content: ''},
    ])

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([ ...messages, { role: 'user', content: message }]),
      });

      if (!response.body) {
        throw new Error('Response body is null');
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const text = decoder.decode(value, { stream: true });
        setMessages((prevMessages) => {
          const lastMessage = prevMessages[prevMessages.length - 1];
          return [
            ...prevMessages.slice(0, -1),
            { ...lastMessage, content: lastMessage.content + text },
          ];
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'assistant', content: 'Sorry, an error occurred. Please try again.' },
      ]);
    } finally {
      setIsLoading(false);
      setMessage('');
    }
  }

  const handleKeyPress = async (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      sendMessage()
    }
  }

  const messagesEndRef = useRef(null)
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return(
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        background: 'linear-gradient(to right, #4B0082, #6A0DAD, #8A2BE2, #9932CC, #BA55D3, #9932CC, #8A2BE2, #6A0DAD, #4B0082)'
      }}
    >
      <Box
        width="95vw"
        height="35px"
        position="relative" 
      >
        {/* Top Left Corner Button */}
        <Box
          position="absolute"
          top={6} 
          left={16} 
        >
          <Tooltip title="Go back" placement="bottom" arrow>
            <Fab
              color="secondary"
              aria-label="Go back"
              href='/'
            >
              <HomeRoundedIcon />
            </Fab>
          </Tooltip>
        </Box>

        {/* Top Right Corner Button */}
        <Box
          position="absolute"
          top={6}
          right={16} 
        >
          <Tooltip title="Delete entire chat" placement="bottom" arrow>
            <Fab
              color="error"
              aria-label="delete chat"
              disabled={isLoading}
              onClick={() => {
                setMessages([
                  {
                    role: 'assistant',
                    content:
                      "Hello! I am your Rate My Prof AI assistant, Profspector AI. How can I help you today?",
                  },
                ]);
              }}
            >
              <Delete />
            </Fab>
          </Tooltip>
        </Box>
      </Box>

      <Stack
        direction={'column'}
        width="100%"
        height="700px"
        p={2}
        spacing={2}
        sx={{ mt: '20px'}}
      >
        <Stack
          direction={'column'}
          spacing={2}
          flexGrow={1}
          overflow="auto"
          maxHeight="100%"
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              p={2}
              justifyContent={
                message.role === 'assistant' ? 'flex-start' : 'flex-end'
              }
            >
              <Box
                sx={{
                    background: message.role === 'assistant'
                    ? 'linear-gradient(to right, #C49102, #D4AF37, #E1C16E, #FFD700, #FFC107, #FFB300, #FFC107, #FFD700, #E1C16E, #D4AF37)'
                    : 'linear-gradient(to right, #000000, #2C2C2C, #4D4D4D, #2C2C2C, #000000);'
                }}
                borderRadius={16}
                border={'1px solid white'}
                p={4}
              >
                <Typography variant="body1" sx={{ color: message.role === 'assistant' ? '#000000' : '#FFD700' }}>
                  {message.content}
                </Typography>
              </Box>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Stack>

        <Paper
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            listStyle: 'none',
            p: 2,
            m: 0,
            borderRadius: 16,
          }}
        >
          <Box width="98%" p={1}>
            <Stack direction='column' spacing={2}>
              <Stack direction={'row'} spacing={2} flexGrow={1} overflow="auto">
                <Chip size="small" label="Give me the best CS105 prof" onClick={() => setMessage("Give me the best CS105 prof")} />
                <Chip size="small" label="Which BIOL100 professors should I avoid?" onClick={() => setMessage("Which BIOL100 professors should I avoid?")} />
                <Chip size="small" label="Give me a prof that doesn't require any textbooks for FR209" onClick={() => setMessage("Give me a prof that doesn't require any textbooks for FR209")} />
                <Chip size="small" label="Which prof is most liked by students for PSYCH200?" onClick={() => setMessage("Which prof is most liked by students for PSYCH200?")} />
                <Chip size="small" label="Which prof cares for their students and teaches ECON305 well?" onClick={() => setMessage("Which prof cares for their students and teaches ECON305 well?")} />
              </Stack>

              <Stack direction={'row'} spacing={3}>
                <TextField
                  label="Message"
                  fullWidth
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  disabled={isLoading}
                  multiline
                  maxRows={1}
                  focused
                />

                <Tooltip title="Send message" placement="top" arrow>
                  <Fab color="primary" aria-label="send a message" onClick={sendMessage} disabled={isLoading}>
                    <Send />
                  </Fab>
                </Tooltip>

              </Stack>
            </Stack>
          </Box>
        </Paper>
      </Stack>
    </Box>
  )
}