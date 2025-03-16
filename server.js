require('app-module-path').addPath(__dirname);
require('./app/cronJobs');
const App = require('./app');

new App();