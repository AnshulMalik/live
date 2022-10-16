const express = require('express');
const app = express();
const http = require('http');
const { Server } = require("socket.io");
const server = http.createServer(app);
const { getFollowerCount } = require("./app")

const io = new Server(server);

app.use(express.static('public'))
app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

const list = {}
let ws
io.on('connection', (socket) => {
  ws = socket
  console.log('a user connected');
  socket.on("message", (message) => {
    const { type, data } = JSON.parse(message)
    switch(type) {
      case "subscribe":
        console.log("Subscribing to ", data)
        list[data] = data
        break
    }
  })
});

function updateCount(username, count) {
  let delay = Math.floor(Math.random() * 3000)
  setTimeout(() => {
    ws.send(JSON.stringify({ type: "tick", data: { username, count }}))
  }, delay)
}

setInterval(async () => {
  const usernames = Object.keys(list)
  if (usernames.length == 0) {
    console.log("No usernames subscribed")
    return
  }
  const results = await getFollowerCount(usernames)
  console.log(results)
  for (let result of results.data) {
    updateCount(result.username, result.public_metrics.followers_count)
  }
}, 3000)

server.listen(3000, () => {
  console.log('listening on *:3000');
});