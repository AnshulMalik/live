
const usersList = [{
  "name": "Narendra Modi",
  "icon": "https://pbs.twimg.com/profile_images/1565985672501927936/d-r-h241_400x400.jpg",
  "username": "narendramodi"
}, {
  "name": "Anshul Malik",
  "icon": "https://pbs.twimg.com/profile_images/1081051708640452608/3NS9UprJ_400x400.jpg",
  "username": "iamanshulmalik"
}]
const subCount = {}
const pageElements = {}
const container = document.getElementById("container");

for (let user of usersList) {
  pageElements[user.username] = createElement(user)
  container.appendChild(pageElements[user.username].domElement)
}

var socket = io();

function startCapture(displayMediaOptions) {
  return navigator.mediaDevices.getDisplayMedia(displayMediaOptions)
    .catch((err) => { console.error(`Error:${err}`); return null; });
}

const displayMediaOptions = {
  video: {
      cursor: "always"
  },
  audio: false
};


const key = "cFIhQXbGFV2hiRADT79j5kGT2"
const secret = "zaS03h71Gt6VVZCuDepLwXFfOjULCmYbP9LaD7iUHegPFdVcSg"
const token = "AAAAAAAAAAAAAAAAAAAAAGbpiAEAAAAAtiZfQ2xnLHbN6RsCaKMusxif7pA%3DFoUM8PMbpgzoGALUsBTVy9xR0ex2uysWjODN5fkH2Qxknloi8o"

const callbacks = {}
socket.addEventListener("message", (message) => {
  const { type, data } = JSON.parse(message)
  switch (type) {
    case "tick":
      let callback = callbacks[data.username]
      if (callback) {
        callback(data.count)
      }
      break
  }
})

function subscribe(username, callback) {
  socket.send(JSON.stringify({ type: "subscribe", data: username }))
  callbacks[username] = callback
}

for (const user of usersList) {
  subscribe(user.username, count => {
    pageElements[user.username].updateTo(count)
  })
}

// 2x2 grid
  

function createElement(user) {
  return new Element(user)
}