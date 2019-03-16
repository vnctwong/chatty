// server.js

const express = require('express');
const SocketServer = require('ws');
const uuidv1 = require('uuid/v1');

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

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  // broadcast message from sending client to all connected clients
  ws.on('message', msgObj => {
    let msgBroadcast = JSON.parse(msgObj);
    let id = uuidv1();
    msgBroadcast.id = id;
    console.log(`ID: ${id}, username: ${msgBroadcast.username}, content: ${msgBroadcast.content}, type: ${msgBroadcast.type}`);
    wss.clients.forEach(client => {
      if (client.readyState === SocketServer.OPEN) {
        client.send(JSON.stringify(msgBroadcast));
      }
    });
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});