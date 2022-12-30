
const select_form = document.getElementById('service-select');

const payment_form= document.getElementById('payment_form');
const amount_payment = document.getElementById('amount_payment');
const date_act = document.getElementById('date-act');
token_x= localStorage.getItem('token');
const getServicesOption = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/v2/servicios/",{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token_x}`,
          },
    });
    const data = await response.json();
    return data.results;
  };

const displayOption = async () => {
const options = await getServicesOption();
for (let option of options) {
    const newOption = document.createElement("option");
    newOption.value = option.id;
    newOption.text = option.name;
    select_form.appendChild(newOption);
}
};
displayOption();

/* let date = new Date().toLocaleDateString();
console.log(date);
date_act.value= date; */
const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

// fecha actual  en formato  yyyy-mm-dd
let currentDate = `${year}-${month}-${day}`;
date_act.value=currentDate;

token_x= window.localStorage.getItem('token');
//JSON.parse(window.localStorage.getItem('token'))
function getUserId(){
    const decode = JSON.parse(atob(token_x.split('.')[1]));
    return decode.user_id;    
}

payment_form.addEventListener('submit', async (event) =>{
    event.preventDefault();
    const data = {
        amount: amount_payment.value,
        expirationDate: date_act.value,
        user: getUserId(),
        service: select_form.options[select_form.selectedIndex].value
    }
    console.log(data.service);
    await fetch("http://127.0.0.1:8000/api/v2/pagos/", {
        method: "POST",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token_x}`,
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
            Swal.fire({
                icon:"error",
                title: 'Oops...',
                text: "¡Ocurrió un error!"
            })           
        }
    })
});

