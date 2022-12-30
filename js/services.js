

const formService = document.getElementById('form');
const name_service = document.getElementById('name-service');
const prefix_service = document.getElementById('prefix-service');
const logo_imagen = document.getElementById('logo');
const logo_url = document.getElementById('logo_url');
token= localStorage.getItem('token');

formService.addEventListener('submit', async (event) =>{
    event.preventDefault();
    //img = "http://127.0.0.1:8000/images/images/"+logo_imagen.files[0].name;
    /* img = logo_imagen.files[0];
    console.log(img); */
    const data = {
        name: name_service.value,
        description: prefix_service.value,
        logo_url: logo_url.value
        //logo: logo_imagen.files[0]
    }
    await fetch("http://127.0.0.1:8000/api/v2/servicios/", {
        method: "POST",
        mode: "cors",
        headers: {
            //'Content-Type': 'application/json;multipart/form-data',
            //'Content-Type': 'multipart/form-data; boundary=something',
            //'Content-Type': 'text/html',
            'Content-Type': 'application/json',
            //'Content-Type': 'multipart/form-data',
            //'Accept': '*/*',
            //'Accept': 'multipart/form-data',
            //'Content-Type': 'application/json',
            //'Accept': 'application/json',         
            'Authorization': `Bearer ${token}`,
          },
        body: JSON.stringify(data)
    }).then((response)=>{
        if (response.ok){
            Swal.fire(
                '¡Creado!',
                'Los datos se guardaron correctamente',
                'success'
              ).then((result) => {
                if (result.isConfirmed) {
                    window.location.replace("./home.html");
                }
            }) 
        }
        else{
            console.log(JSON.stringify(data));
            Swal.fire({
                icon:"error",
                title: 'Oops...',
                text: "¡Ocurrió un error!"
            })           
        }
    })
});

