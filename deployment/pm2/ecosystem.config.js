module.exports = {
  apps: [
    {
      name: 'hisobchi-backend',
      script: 'server.js',
      cwd: './backend',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 5000
      }
    }
  ]
};
