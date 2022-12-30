
const tbody_payments = document.querySelector("#tbody_payments");
const tbody_payments_expir = document.querySelector("#tbody_payments_expir");

token= localStorage.getItem('token');

async function getPayments() {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v2/pagos',{
        method: "GET",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
      });
      const data = await response.json();
      renderPayments(data);
      
    } catch (error) {
      console.log(error);
    }
}

const getServicesById = async (id) => {
    const response = await fetch(`http://127.0.0.1:8000/api/v2/servicios/${id}`,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  }
function renderPayments(data) {
    tbody_payments.innerHTML = "";
    data.results.forEach(async (payment) => {
        let sv_name= await getServicesById(payment.service);

        tbody_payments.innerHTML += `
        <tr>
            <td class="text-center"><img src="${sv_name.logo_url}" alt="logo" class="rounded-circle" style="width:45px; height:45px;"></td>
            <td class="align-middle text-center">${sv_name.name}</td>
            <td>${payment.paymentDate}</td>
            <td class="align-middle">${payment.amount}</td>
        </tr>
        `
    });
}
getPayments();


const getPaymentsById = async (id) => {
    const response = await fetch(`http://127.0.0.1:8000/api/v2/pagos/${id}`,{
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


async function getExpiredPayments() {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v2/expirados',{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      renderPaymentsExpired(data);
    } catch (error) {
      console.log(error);
    }
}
function renderPaymentsExpired(data) {
    tbody_payments_expir.innerHTML = "";
    data.results.forEach(async (expired_payment) => {
        let payments= await getPaymentsById(expired_payment.payment_user);
        let services= await getServicesById(payments.service);

        tbody_payments_expir.innerHTML += `
        <tr>
            <td class="text-center"><img src="${services.logo_url}" alt="logo" class="rounded-circle"style="width:45px; height:45px;"></td>
            <td class="align-middle text-center">${services.name}</td>
            <td class="align-middle">${payments.paymentDate}</td>
            <td class="align-middle text-center">${payments.amount}</td>
            <td>${expired_payment.penalty_fee_amount}</td>

        </tr>
        `
    });
}
getExpiredPayments();
