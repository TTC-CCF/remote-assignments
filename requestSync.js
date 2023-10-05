// requestSync.js
const url = "https://ec2-54-64-246-136.ap-northeast-1.compute.amazonaws.com/delay-clock";
async function requestSync(url) {
    // write code to request url synchronously
    const start = new Date().getTime();

    const resopnse = await fetch(url);
    const data = await resopnse.json();
    const end = data.data * 1000;
    console.log(end - start);
}

async function main() {
    await requestSync(url);
    await requestSync(url);
    await requestSync(url);
}

main();
// requestSync(url) // would print out the execution time
// requestSync(url)
// requestSync(url)