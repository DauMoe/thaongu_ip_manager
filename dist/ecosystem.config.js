//Config file: https://pm2.keymetrics.io/docs/usage/application-declaration/

module.exports = {
  apps : [{
    name: "ip_manager",
    script: "./server.js",
    watch: true,
    exec_mode: "cluster"
  }]
};
