module.exports = {
  main: 'main',
  packagePath: 'packages',
  defaultApp: 'sub-app',
  container: '#sub-container',
  apps: [
    {
      name: 'sub-app',
      host: 'localhost',
      port: 7000,
      activeRule: '/sub-app',
      history: true
    }
  ]
};
