const { createClient } = require('redis')
module.exports = redis = {}

init();

async function init() {
  const client = createClient();

  client.on('error', (err) => console.log('Redis Client Error', err));

  await client.connect();

  redis.client = client

}