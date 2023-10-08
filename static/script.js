function validateData() {
    var name = document.getElementById("name");
    var email = document.getElementById("email");
    var password = document.getElementById("password");

    return (name.validity.valid && email.validity.valid && password.validity.valid)
}

function UserSignIn(){
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    if (!validateData()) {
        return;
    }
    fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Request-Date': new Date().toUTCString()
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.data.error) {
            alert(data.data.error);
        } else {
            alert(JSON.stringify(data.data.user))
        }
    });
}