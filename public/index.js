var xhr = new XMLHttpRequest();

let token = '';

let submitButton = document.getElementById("submit");

submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("wtf");
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    login(email, password);
});

function login(email, password){
    
    postData("http://localhost:3000/auth/authentication", { email, password })
    .then(res => {
        token = res.token;
        console.log(token);
    })
    .catch(e => console.log(`Erro: ${e}`));

    getData('http://localhost:3000/dashboard', {au: 'au'})
        .then(res => console.log(res));
}

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
            'Authorization': token
        },
        redirect: 'follow', // manual, *follow, error
    });

    return response;
}

