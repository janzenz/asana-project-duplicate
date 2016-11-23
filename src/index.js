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
			limit: 2 // response limit
		})
	})
	.then((response) => {
		const stream = response.stream();

		stream.on('data', (task) => {
			if (task.assignee_status === 'today' || 
				task.assignee_status === 'new') {
				stream.pause();

				// make an api call to migrate the tasks
				new Promise((resolve, reject) => {
					console.log(task);
					stream.resume();
				});
			}
		}).on('end', () => {
			console.log('Done transferring the tasks.')
		}).on('error', (err) => {
			console.error(err);
		})
	})
