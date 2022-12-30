const select_form = document.getElementById('service-select');
const name_service = document.getElementById('name-service');
const prefix_service = document.getElementById('prefix-service');
const form_Service = document.getElementById('form_Service');
const idservice = document.getElementById('idservice');
token_x= localStorage.getItem('token');
const getServicesOption = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/v2/servicios/",{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token_x}`,
          },
    });
    const data = await response.json();
    //console.log(data.results)
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

const getServicesById = async (id) => {
    const response = await fetch(`http://127.0.0.1:8000/api/v2/servicios/${id}`,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token_x}`,
          },
    });
    const data = await response.json();
    inputValueService(data)
    //name_service.value =data.name
    //prefix_service.value =data.description
  };


select_form.addEventListener('change', function() {
    //let selection = select_form.selectedIndex;
    //select_form.options[select_form.selectedIndex].selected = false;
    //select_form.options[select_form.selectedIndex].setAttribute('selected',true);
    const  value_option = select_form.options[select_form.selectedIndex].value;
    
    /* if( select_form.selectedIndex != selection){
        select_form.options[select_form.selectedIndex].setAttribute('selected',true);
        select_form.options[selection].selected = false;
        selection = select_form.selectedIndex
        console.log("selectr:"+selection);
    } */
    getServicesById(value_option);
 
});
function inputValueService(data){
    const {name, description : prefix, id} = data;
    name_service.value =name;
    prefix_service.value =prefix;
    idservice.value =id;
}

async function updateService(){
    const data = {
        name: name_service.value,
        description: prefix_service.value
    }
    await fetch(`http://127.0.0.1:8000/api/v2/servicios/${idservice.value}/`, {
        method: "PUT",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token_x}`,
          },
        body: JSON.stringify(data)
    }).then((response)=>{
        if (response.ok){
            Swal.fire(
                '¡Actualizado!',
                'Los datos se actualizaron correctamente',
                'success'
              ).then((result) => {
                if (result.isConfirmed) {
                    returnTodo();
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
}
form_Service.addEventListener('submit', (event) => {
    event.preventDefault();
    updateService();
});