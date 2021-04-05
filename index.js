const push = require('./src/utils/push');
const settings = require('./src/app/settings');


async function main() {
  const app = require('./src/app')();

  const server = app.listen(settings.port, settings.hostname, () => {
    console.log(`🌍 http://${settings.hostname}:${settings.port}`);
  })

  const shutdown = () => {
    push.shutdown();
    server.close();
    process.exit(-1);
  }
  process.on('SIGTERM',shutdown)
    .on('SIGINT', shutdown)
    .on('unhandledRejection', console.error);
}


if (__filename === process.argv[1]) {
  main()
    .catch(console.error);
}
