import React, { useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:4001");

function ChatSection() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

const joinRoom = () => {
    if(username !== "" && room !== ""){
        socket.emit("join_room",room);
    }
}

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold text-center text-gray-700 mb-4">
          Join A Chat
        </h3>

        <input
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Name"
          onChange={(event) => setUsername(event.target.value)}
        />

        <input
          className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="ID"
          onChange={(event) => setRoom(event.target.value)}
        />

        <button
          className="w-full py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          onClick={joinRoom}
        >
          Join A Room
        </button>
      </div>
    </div>
  );
}

export default ChatSection;
