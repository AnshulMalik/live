const key = "cFIhQXbGFV2hiRADT79j5kGT2"
const secret = "zaS03h71Gt6VVZCuDepLwXFfOjULCmYbP9LaD7iUHegPFdVcSg"
const token = "AAAAAAAAAAAAAAAAAAAAAGbpiAEAAAAAtiZfQ2xnLHbN6RsCaKMusxif7pA%3DFoUM8PMbpgzoGALUsBTVy9xR0ex2uysWjODN5fkH2Qxknloi8o"

async function getFollowerCount(usernames) {
  usernames = usernames.join(',')
  console.log("sending usernames", usernames)
  return fetch(`https://api.twitter.com/2/users/by?user.fields=public_metrics&usernames=${usernames}`, {
    method: "GET",
    mode: "no-cors",
    credentials: "include",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }).then(resp => resp.json())
}

module.exports = {
    getFollowerCount
}