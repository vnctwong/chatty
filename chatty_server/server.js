// server.js

const express = require('express');
const SocketServer = require('ws');
const uuidv1 = require('uuid/v1');
const WebSocket = require('ws');

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
let socketConnections = 0;

const addSocketCount = () => {
  console.log('~~~~~~~~~~~~ addSocket called')

  socketConnections++;
  // wss.broadcast = function broadcast(data) {
  console.log('~~~~~~~broadcast function')
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(socketConnections);
    }
  });
  // };
  // wss.broadcast(JSON.stringify({ // sending where & how to receive?
  //   type: 'userCountChange',
  //   userCount: socketConnections
  // }));
}



const minusSocketCount = () => {
  // socketConnections--;
  // wss.broadcast(JSON.stringify({ // sending where & how to receive?
  //   type: 'userCountChange',
  //   userCount: socketConnections
  // }));

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //loop over client array, send wss.client.size in socket
  //to render broadcast, case statement in compDidMount
}

// When a client connects they are assigned a socket, represented by the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  addSocketCount(); // changes userCount 

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

    // minusSocketCount(); // changes user count

  });
});