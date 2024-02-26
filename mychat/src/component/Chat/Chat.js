// Chat.js
import React, { useEffect, useState } from 'react';
import socketIo from "socket.io-client";
import "./Chat.css";
import sendLogo from "../../images/send.png";
import Message from "../Message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";
import closeIcon from "../../images/closeIcon.png";
import { useLocation } from "react-router-dom";

let socket;

const ENDPOINT = "http://localhost:3006";

const Chat = () => {
  const [id, setid] = useState("");
  const [user, setUser] = useState("");
  const [messages, setMessages] = useState([]);
  const location = useLocation();

  const send = () => {
    const message = document.getElementById('chatInput').value;
    socket.emit('message', { message, id });
    document.getElementById('chatInput').value = "";
  };

  useEffect(() => {
    const userName = new URLSearchParams(location.search).get("name");
    setUser(userName);

    socket = socketIo(ENDPOINT, { transports: ['websocket'] });

    socket.on('connect', () => {
    //   alert('Connected');
      setid(socket.id);
      socket.emit('joined', { user: userName });
    });

    socket.on('welcome', (data) => {
      setMessages(prevMessages => [...prevMessages, data]);
    });

    socket.on('userJoined', (data) => {
      setMessages(prevMessages => [...prevMessages, data]);
    });

    socket.on('leave', (data) => {
      setMessages(prevMessages => [...prevMessages, data]);
    });

    socket.on('sendMessage', (data) => {
      setMessages(prevMessages => [...prevMessages, data]);
    });

    return () => {
      if (socket) {
        socket.disconnect();
        socket.off();
      }
    };
  }, [location.search]);

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header">
          <h2>EzChat</h2>
          <a href="/"> <img src={closeIcon} alt="Close" /></a>
        </div>
        <ReactScrollToBottom className="chatBox">
          {messages.map((item, i) => (
            <Message key={i} user={item.id === id ? '' : item.user} message={item.message} classs={item.id === id ? 'right' : 'left'} />
          ))}
        </ReactScrollToBottom>
        <div className="inputBox">
          <input onKeyPress={(event) => event.key === 'Enter' ? send() : null} type="text" id="chatInput" />
          <button onClick={send} className="sendBtn"><img src={sendLogo} alt="Send" /></button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
