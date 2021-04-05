const axios = require('axios');

// Generate random username
const userName = async () => {
  const res = await axios('https://random-data-api.com/api/users/random_user');

  const { id, username } = res.data
  return `${username}#${id}`;
}



module.exports = { userName };
