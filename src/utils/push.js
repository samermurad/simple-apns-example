/**
 * A Very basic implementation of the APNS push
 *
 */

const apn = require('apn');
const settings = require('../app/settings.js')


const options = {
  token: {
    key: settings.keyAuthLocation,
    keyId: settings.keyId,
    teamId: settings.teamId,
  },
  production: false
};
const provider = new apn.Provider(options);

const shutdown = () => {
  provider.shutdown();
  process.exit(-1);
}
process.on('SIGTERM',shutdown)
  .on('SIGINT', shutdown)
  .on('unhandledRejection', shutdown);

module.exports = {
  send: async (opt) => {
    const {
      token,
      title = 'Provisional',
      body = 'Test Notification ' + new Date().getTime(),
    } = opt;

    let notification = new apn.Notification({ topic: settings.bundleId });
    notification.body = body;
    notification.title = title;
    notification.sound = "bingbong.aiff";
    return provider.send(notification, token)
  },
  shutdown: () => provider.shutdown(),
}
