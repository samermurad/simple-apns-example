const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const TmpCache = require('./tmpCache.js')
const cache = new TmpCache('UserTokens', __dirname)
const apn = require('apn')

const app = express();

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next))
    .catch(next)
}
app.use(bodyParser.json())
app.use(morgan('dev'));

app.get('*', (req, res) => {
  res.status(200).json({
    message: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().getTime(),
  })
});

app.post('/save', asyncHandler(async (req, res, next) => {
  const {
    token,
    userName,
  } = req.body
  if (token == null) { res.status(400).json({ message: 'missing token' }); return; }

  if (userName == null) { res.status(400).json({ message: 'missing userName' }); return; }

  cache.users = cache.users || {}

  cache.users[userName] = token
  await cache.save();
}))

app.post('/send', asyncHandler(async (req, res, next) => {

}));

app.listen(3090, '0.0.0.0', () => {
  console.log('🌍 http://0.0.0.0:3090')
})
