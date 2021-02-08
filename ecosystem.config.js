module.exports = {
  apps : [{
    name: 'qub_develop',
    script: 'server.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env_develop: {
      "QB_MONGO_URL":"mongodb://localhost:27017/ensurity",
      "QB_PORT":"5000",
      "NODE_ENV": "develop"
    }
  }],

};
