const ServerError = require('../utils/ServerError.js')
const cache = require('../app/cache.js');
const randomApi = require('../utils/randomApi.js');
const push = require('../utils/push.js');

const healthCheck = async (req, res) => {
  res.status(200).json({
    message: 'ok',
    timestamp: new Date().getTime(),
    uptime: process.uptime(),
  })
}

const sendNotification = async (req, res) => {
  const { token, userName, title, message } = req.body;
  let deviceToke = token
  if (!userName && !token) throw new ServerError('Missing UserName / Token')
  if (userName) {
    if (!cache.users) throw new ServerError('No users, please add a user with the save route', 400);
    if (userName && !cache.users[userName]) throw new ServerError(`UserName: ${userName} doesn't exist`);
    else {
      deviceToke = cache.users[userName]
    }
  }

  if (!deviceToke) throw new ServerError('missing Token');
  const data = await push.send({ token: deviceToke, title, body: message })

  res.status(200).json(data)
};

const saveUser = async (req, res) => {
  let {
    token,
    userName,
  } = req.body;

  if (token == null) throw new ServerError({ message: 'missing token' });
  if (userName == null) {
    userName = await randomApi.userName();
  }
  cache.users = cache.users || {}

  cache.users[userName] = token
  await cache.save();

  res.status(200).json({
    userName,
    token,
  })
}



module.exports = {
  healthCheck,
  saveUser,
  sendNotification,
}
