// server.js

const express = require('express');
const SocketServer = require('ws');
const uuidv1 = require('uuid/v1');
// const WebSocket = require('ws');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer.Server({
  server
});

// Just fnc dfn, actual function called in socketCount below
wss.broadcast = function broadcast(payloadBroadcast) {
  wss.clients.forEach((client => {
    if (client.readyState === 1) {
      client.send(JSON.stringify(payloadBroadcast))
    }
  }));
};

const socketCount = () => {
  console.log('~~~~~~ socketCount called')

  let payloadBroadcast = {
    type: 'userCount',
    userCount: wss.clients.size
  }
  // not actual "broadcast", just fnc to loop/send clients. Broadcasts only at socket connection below
  wss.broadcast(payloadBroadcast);
}

// When a client connects they are assigned a socket, represented by the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  socketCount();

  // broadcast to all connected clients. Regardless of source, all data through socket is payloadBroadcast
  ws.on('message', payloadObj => {
    let payloadBroadcast = JSON.parse(payloadObj);
    let id = uuidv1();
    payloadBroadcast.id = id;

    console.log(`ID: ${id}, username: ${payloadBroadcast.username}, content: ${payloadBroadcast.content}, type: ${payloadBroadcast.type}`);

    wss.clients.forEach(client => {
      if (client.readyState === SocketServer.OPEN) {
        client.send(JSON.stringify(payloadBroadcast));
      }
    });

  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');

    socketCount();

  });
});