function validateData() {
    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let password = document.getElementById("password");

    return (name.validity.valid && email.validity.valid && password.validity.valid)
}

function UserSignIn(){
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (!validateData()) {
        return;
    }
    fetch('/users', {
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

export { UserSignIn, validateData }