// requestAsync.js
const { request } = require('http');
const https = require('https');
const url = "https://ec2-54-64-246-136.ap-northeast-1.compute.amazonaws.com/delay-clock";

function requestCallback(url, callback) {
    // write code to request url asynchronously
    const start = new Date().getTime();
    https.get(url, (res) => {
        res.on('data', (d) => {
            const end = JSON.parse(d).data * 1000;
            callback(end - start)
        })
    });
}
function requestPromise(url) {
    // write code to request url asynchronously with Promise

    return new Promise((resolve, reject) => {
        const start = new Date().getTime();
        https.get(url, (res) => {
            res.on('data', (d) => {
                const end = JSON.parse(d).data * 1000;
                resolve(end - start)
            })
        });
    })
}
async function requestAsyncAwait(url) {
    // write code to request url asynchronously
    // you should call requestPromise here and get the result using async/await.
    const data = await requestPromise(url);
    console.log(data);
}
requestCallback(url, console.log); // would print out the execution time
requestPromise(url).then(console.log);
requestAsyncAwait(url);
