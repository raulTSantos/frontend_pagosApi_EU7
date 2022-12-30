
const buttonLogout = document.querySelector("#buttonLogout");
const current_username =document.getElementById('current_username');
const menu_ul =document.getElementById('menu_ul');

/* const URLlogin ="http://127.0.0.1:5500/REST/payment_api-client/login.html";
const URLService ="http://127.0.0.1:5500/REST/payment_api-client/new-services.html";
const URLServiceUpdate ="http://127.0.0.1:5500/REST/payment_api-client/update-services.html"; */

const URLRlogin = "/login.html";
const URLRService = "/new-services.html";
const URLRServiceUpdate = "/update-services.html";

let URLactual = window.location.href;
const URLlogin = relativeToAbsolute(URLRlogin);
const URLService = relativeToAbsolute(URLRService);
const URLServiceUpdate = relativeToAbsolute(URLRServiceUpdate);

//convertir la ruta relativa en absoluta
//recibe dos parametros: url relativa y url raiz
function relativeToAbsolute(relativeURL) {
    return new URL(relativeURL, 'http://127.0.0.1:5500').href;
}


token= localStorage.getItem('token');

let refresh_token =localStorage.getItem('refresh_token');

// agrega el nombre del usuario logeado
//current_username.textContent = user;

// elimina el token del localStorage y envia  a la pagina de login
function logout(){
    /* window.localStorage.removeItem('token'); 
    window.localStorage.removeItem('refresh_token');  */
    window.localStorage.clear();
    window.location.href="./login.html";
}

// evento click en el boton logout llama a la funcion logout()
buttonLogout.onclick = function(event){
    event.preventDefault();
    logout();
}
const refreshToken = async (value_refresh) => {
    const data = {
        refresh: value_refresh,

    }
    await fetch("http://127.0.0.1:8000/users/jwt/refresh/",{
        method: "POST",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(data)
    }).then(async (response)=>{
        rpt= await response.json();
        if (response.ok){
            window.localStorage.removeItem('token'); 
            window.localStorage.removeItem('refresh_token'); 
            localStorage.setItem('token',rpt.access);
            console.log(rpt);
            window.location.href;
        }else{
            console.log("error");
        }
    });

  };
// obtiene el tiempo de expiracion del token con la finalidad de verificar si el token ha expirado
// se ejecuta funcion refreshToken()
const tokenExpirationJwt = (tokn) => { 
    if (tokn != null){
        const decode = JSON.parse(atob(tokn.split('.')[1])); 

        if (decode.exp * 1000 < new Date().getTime()) {
            //logout();
            refreshToken(refresh_token);
            console.log('Time Expired');
        }
    }     
    
};

tokenExpirationJwt(token);

// redirige a la pagina de login solo si se cumple la condicion 
function redirectLogin(){
    if(token== null && URLactual != URLlogin) {
        //location.reload(false);
        window.location.href="./login.html";
    }

}
redirectLogin();


const getUserById = async (id) => {
    const response = await fetch(`http://127.0.0.1:8000/users/${id}`,{
      method: "GET",
      mode: "cors",
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
    });
    const data = await response.json();
    return data;
}
//pinta el usuario nombre del actual
async function showUser(){
    const decode = JSON.parse(atob(token.split('.')[1]));
    let dt = await getUserById(decode.user_id);
    current_username.textContent= dt.email;
}
showUser();

//muestra el menu desplegable de servicios para usuario administrador
async function showUserAdmin(){
    const decode = JSON.parse(atob(token.split('.')[1]));
    let dt = await getUserById(decode.user_id);
    if(dt.is_staff && dt.is_superuser){
        menu_ul.innerHTML +=`
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Servicios
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
            <li><a class="dropdown-item" href="./new-services.html">Añadir</a></li>
            <li><a class="dropdown-item" href="./update-services.html">Actualizar</a></li>
            </ul> 
        </li>
        `
    }
}
showUserAdmin();

// restringe las paginas que solo son permitidad al administrador
async function restringURL(){
    const decode = JSON.parse(atob(token.split('.')[1]));
    let dt = await getUserById(decode.user_id);
    if(!dt.is_staff && !dt.is_superuser && (URLactual == URLService || URLactual ==URLServiceUpdate)){
        window.history.back();
    }
}
restringURL();
/* let dta=  inf().then(function(result){
    console.log(result);
  }) */
/*  let dta= inf().then(x => {return x});
 console.log(dta); */