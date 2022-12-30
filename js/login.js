
const email = document.getElementById('email');
const password = document.getElementById('password');

const formLogin = document.getElementById('formLogin');

const URLRlogin = "/login.html";
const URLRService = "/new-services.html";
const URLRServiceUpdate = "/update-services.html";

const URLlogin = relativeToAbsolute(URLRlogin);

let URLactual = window.location.href;

token= localStorage.getItem('token');

function relativeToAbsolute(relativeURL) {
    return new URL(relativeURL, 'http://127.0.0.1:5500').href;
}


formLogin.addEventListener('submit', async (event) =>{
    event.preventDefault();
    const data = {
        email: email.value,
        password: password.value
    }
    try {
        await fetch("http://127.0.0.1:8000/users/login/", {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json, text/plain, */*',
            },
            body: JSON.stringify(data)
        }).then(async (response)=>{
            rpt= await response.json();
            if (response.ok){

                localStorage.setItem('token',rpt.tokens['access']);
                //localStorage.setItem('current_user',rpt.name);
                localStorage.setItem('refresh_token',rpt.tokens['refresh']);
                window.location.replace("./home.html");
            }
            else{
                Swal.fire({
                    icon:"error",
                    title: 'Oops...',
                    text: rpt.message
                }) 
            }
            })
            
        }catch (error) {
            console.log(error);
        }
        
    
});


function redirectLogin(){
    // redirige a la pagina de login si se ha cerrado sesion evitando regresar a la pagina anterior
    if(token== null && URLactual != URLlogin){
        window.location.href="./login.html";
    }
    // evita que acceda a la pagina de login cuando el usuario esta logeado
    else if (token!= null && URLactual == URLlogin ){      
        window.history.back();
        //window.history.go(-1);
    }

}

redirectLogin();
console.log(URLlogin);