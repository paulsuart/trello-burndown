/*
 * Trello burndown chart generator
 *
 * Author: Norbert Eder <wpfnerd+nodejs@gmail.com>
*/

var options = require('optimist')
			  .usage('Trello information.\n\nUsage: $0 -b')
			  .alias('b', 'boards')
			  .describe('List all boards available for current member');

var optionArgs = options.argv;
global.settings = require('./settings');

var Trello = require('./Lib/Trello');
var trello = new Trello(global.settings.applicationKey, global.settings.userToken);

trello.getBoards('me', function(error, boards) {
	if (error) {
		console.error(error);
	} else {
		for (var i = 0; i < boards.length; i++) {
			var board = boards[i];
			console.log(board.id + ' ' + board.name);
		}
	}
});
