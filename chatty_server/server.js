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

const userCountBroadcast = () => {
  console.log('~~~~~~ userCountBroadcast called')

  let userCountBroadcastObj = {
    type: 'userCount',
    userCount: wss.clients.size
  }
  wss.broadcast(userCountBroadcastObj);
}

// Just fnc dfn, actual broadcast called in userCountBroadcast
wss.broadcast = function broadcast(userDataObj) {
  wss.clients.forEach((client => {
    if (client.readyState === 1) {
      client.send(JSON.stringify(userDataObj))
    }
  }));
};

// When a client connects they are assigned a socket, represented by the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  userCountBroadcast();

  // broadcast message from sending client to all connected clients
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

    userCountBroadcast();

  });
});