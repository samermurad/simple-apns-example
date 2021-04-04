require('dotenv').config()


const settings = {
  teamId: process.env.TEAM_ID,
  keyId: process.env.KEY_ID,
  keyAuthLocation: process.env.KEY_PATH,
}

module.exports = settings;
