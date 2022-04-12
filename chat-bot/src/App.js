import React from "react";
import Chatbot from "react-chatbot-kit";
import 'react-chatbot-kit/build/main.css'
import './App.css';
import config from './config';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';


function App() {
  return (
    <div className="App">
     Hello
    <div>
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </div>
    </div>
  );
}

export default App;
