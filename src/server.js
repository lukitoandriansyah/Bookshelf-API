const  Hapi = require('@hapi/hapi');
const routes = require('./routes');

const starter = async () => {
  const server = Hapi.server({port: 9000, host: 'localhost', routes:{cors:{origin:['*']}}});
  server.route(routes);
  await server.start();
  console.log(`Server was running in ${server.info.uri}`)
}

starter()