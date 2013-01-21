/*
 * Trello burndown chart generator
 *
 * Author: Norbert Eder <wpfnerd+nodejs@gmail.com>
 */

var fs = require('fs');
var path = require('path');

global.settings = require('./settings');
settings.root   = __dirname.replace(/\/+$/, "");
settings.exportPath = path.join(settings.root, 'export');
settings.templatePath = path.join(settings.root, 'templates' + path.sep + settings.template);

var server = require('./lib/server');
require('http').createServer(server).listen(settings.port);