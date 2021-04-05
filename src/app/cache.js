const TmpCache = require('../utils/TmpCache.js');
// cache with file in root dir
const cache = new TmpCache('UserTokens', process.cwd());

// load cache
cache.load()

module.exports = cache;
