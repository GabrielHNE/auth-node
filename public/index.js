var xhr = new XMLHttpRequest();

let Token = '';

let submitButton = document.getElementById("submit");


window.addEventListener('popstate', (event) => {
    console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
});

submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    login(email, password);
});

async function login(email, password){
    
    Token = await postData("http://localhost:3000/auth/authentication", { email, password });

    res = await getData("http://localhost:3000/dashboard");

    if(res){
        history.pushState(Token, 'Dashboard', 'dashboard.html');
        console.log('hehehe');
    }
}

// getData('http://localhost:3000/dashboard', {au: 'au'})
//         .then(res => console.log(res));

async function postData(url = '', data = {}){

    const response = await fetch(url,{
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        //mode: 'cors', // no-cors, *cors, same-origin
        //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        //credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        //referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });

    return response.json();
}

async function getData(url = '', headers){
    const response = await fetch(url,{
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        credentials: 'same-origin', // include, *same-origin, omit
        headers:{
            'Authorization': 'Bearear ' + Token.token
        },
        redirect: 'follow'
    });

    return response;
}

