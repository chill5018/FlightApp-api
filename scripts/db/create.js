const path = require('path');

const { exec } = require('child-process-promise');
const { parseURL } = require('whatwg-url');

require('server/initialize');

const spawnOptions = { cwd: path.join(__dirname, '../..'), stdio: 'inherit' };

(async () => {
  const parts = parseURL(process.env.POSTGRES_SERVICE_URL);

  try {
    console.log('Create running');
    await exec(
      `createdb -U postgres -h ${parts.host} -p ${parts.port} -O postgres ${parts.path[0]}`,
      spawnOptions
    );
    console.log('*************************');
    console.log('Create successful');
  } catch (err) {
    console.log('*************************');
    console.log('Create failed. Error:', err.message);
  }

  process.exit(0);
})();
