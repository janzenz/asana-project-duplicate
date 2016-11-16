#! /usr/bin/env node
import "babel-polyfill";
import config from '../config.js';
import Asana from 'asana';

const client = Asana.Client.create().useAccessToken(config.apiKey);

client.users.me()
	.then((user) => {
		const userId = user.id;
		let workspaceId;
		
		for (let workspace of user.workspaces) {
			if (workspace.name === 'Better Doctor Inc.') {
				workspaceId = workspace.id
				break;
			}
		}

		return client.tasks.findAll({
			assignee: userId,
			workspace: workspaceId,
			completed_since: 'now',
			opt_fields: 'id,name,assignee_status,completed',
			limit: 2
		})
	})
	.then((response) => {
		response.stream().on('data', (task) => {
			if (task.assignee_status === 'today' || 
				task.assignee_status === 'new') {
				console.log(task);
			}
		})
	})
	// .filter((task) => {
	// 	return task.assignee_status === 'today' ||
	// 		task.assignee_stat === 'new';
	// })
	// .then((list) => {
	// 	console.log(list)
	// })
// var exec = require('child_process').exec;

// var child = exec('curl -H "Authorization: Bearer ' + config.apiKey + '" https://app.asana.com/api/1.0/users/me', function(err, stdout, stderr) {
// 	console.log(stdout);
// });

// var userArgs = process.argv.slice(2);
// var searchPattern = userArgs[0];
