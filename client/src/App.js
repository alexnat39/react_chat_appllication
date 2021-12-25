import "./App.css";
import io from "socket.io-client";
import React, { useState } from "react";
import Chat from "./Chat.js";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, changeUsername] = useState("");
  const [room, changeChatRoom] = useState("");
  const [showChat, changeShowChat] = useState(false);

  const joinChatRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      changeShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join Chat</h3>

          <input
            type="text"
            placeholder="Name"
            onChange={(event) => {
              changeUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Chat Room ID"
            onChange={(event) => {
              changeChatRoom(event.target.value);
            }}
          />
          <button onClick={joinChatRoom}>Join Chat Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
