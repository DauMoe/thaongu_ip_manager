module.exports = {
  apps : [{
    name: 'thaongu_production',
    script: 'server.js',
    cwd: __dirname,
    env: {
      NODE_ENV: 'production'
    },
    exec_mode: 'cluster',
    autorestart: true
  }],

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
