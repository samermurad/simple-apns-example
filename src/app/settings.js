require('dotenv').config()


const settings = {
  // General
  port: parseInt(process.env.PORT || '3090', 10),
  hostname: process.env.HOST_NAME || '0.0.0.0',
  // APNS
  teamId: process.env.TEAM_ID,
  keyId: process.env.KEY_ID,
  keyAuthLocation: process.env.KEY_PATH,
  bundleId: process.env.BUNDLE_ID,
}

module.exports = settings;
