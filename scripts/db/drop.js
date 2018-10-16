const path = require('path');

const { exec } = require('child-process-promise');
const { parseURL } = require('whatwg-url');

require('server/initialize');

const spawnOptions = { cwd: path.join(__dirname, '../..'), stdio: 'inherit' };

(async () => {
  const parts = parseURL(process.env.POSTGRES_SERVICE_URL);

  try {
    console.log('Drop running');
    await exec(`dropdb -U postgres ${parts.path[0]}`, spawnOptions);
    console.log('*************************');
    console.log('Drop successful');
  } catch (err) {
    console.log('*************************');
    console.log('Drop failed. Error:', err.message);
  }

  process.exit(0);
})();
