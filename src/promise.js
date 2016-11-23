import 'babel-polyfill';
import request from 'request';

const httpGet = (url) => {
    return new Promise((resolve, reject) => {
    	request(url, (error, response, body) => {
			if (!error && response.statusCode == 200) {
				resolve(body);
			} else {
				reject(error);
			}
    	})
    })
}

// httpGet("http://jsonplaceholder.typicode.com/posts/100").then((body) => {
// 	console.log(JSON.parse(body));
//     return httpGet("http://jsonplaceholder.typicode.com/users/1/albums");
// }).then((body) => {
// 	console.log(JSON.parse(body));
// 	return httpGet("http://jsonplaceholder.typicode.com/users/2/albums");
// }).then((body) => {
// 	console.log(JSON.parse(body));
// }).catch((error) => {
// 	console.log(error);
// })

// Promise.all([
// 	httpGet("http://jsonplaceholder.typicode.com/posts/100"),
// 	httpGet("http://jsonplaceholder.typicode.com/users/1/albums"),
// 	httpGet("http://jsonplaceholder.typicode.com/users/2/albums"),
// ]).then((htmls) => {
// 	htmls.forEach((body) => {
// 		const json = JSON.parse(body);
//     	console.log('----------------------');
//     	console.log(json);
// 	})
// }).catch((error) => {
// 	console.log(error);
// })

const delay = (ms) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log('Inside timeout: ', ms)
			resolve(ms)
		}, ms);
	})
}

console.log('Sync 1');

delay(5000).then((ms) => {
	console.log(ms + ' seconds have passed.');
	return delay(1000);
}).then((ms) => {
	console.log(ms + ' seconds have passed.');
}).catch((error) => {
	console.log(error);
})

const newPromise = new Promise((resolve, reject) => {
	resolve('test')
});

newPromise.then((result) => {
	console.log(result)
})

console.log('Sync 2');

Promise.all([
	delay(10000),
	delay(3000),
	delay(4000),
]).then((ms) => {
	ms.forEach((num) => {
		console.log(num);
	})
})
