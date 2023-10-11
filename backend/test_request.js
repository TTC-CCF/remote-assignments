function test_post() {
        return fetch('http://3.104.242.69:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Request-Date': new Date().toUTCString()
            },
            body: JSON.stringify({
                name: 'yoyoy',
                email: 'iii.cs10@nycu.edu.tw',
                password: '^**paul3'
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.data.user)
                return data.data.user.id;
            else
                return 1;
        })
        .catch (err => {
            console.log(err);
            return 1;
        });
}

function test_get(id) {
    return fetch(`http://3.104.242.69:3000/users?id=${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Request-Date': new Date().toUTCString()
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
    })
    .catch (err => {
        console.log(err);
    });
}

async function main() {
    var id = await test_post();
    await test_get(id);
}

main();