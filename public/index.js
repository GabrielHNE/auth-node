var xhr = new XMLHttpRequest();

let submitButton = document.getElementById('submit');

submitButton.addEventListener( 'click', (event)=>{
    event.preventDefault();
    console.log("WTF");
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // console.log(email.value);
    // console.log(password.value);
    
    // login(email.value, password.value);
    xhr.open("POST", "http://localhost:3000/auth/authentication", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    // xhr.onreadystatechange = function() {
    //     if (xhr.readyState === 4) {
    //       console.log(xhr.response);
    //     }
    // }

    xhr.send(JSON.stringify({
        email,
        password})
    );
});

