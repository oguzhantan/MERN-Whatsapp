import React, { useEffect,useState } from 'react';
import './App.css';
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Pusher from "pusher-js";
import axios from "./axios";

function App() {

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get("/messages/sync")
      .then((response) => {
        console.log(response.data);
        setMessages(response.data);
      })
  }, []);

  useEffect(() => {
      const pusher = new Pusher('76ef90196474ff06cd1c', {
        cluster: 'eu',
      });

      const channel = pusher.subscribe("messages");
      channel.bind("inserted",(newMessage) => {
        setMessages([...messages, newMessage]);
      });
    
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat messages={messages}/>
      </div>
    </div>
  );
}

export default App;
