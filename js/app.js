document.querySelector('form').addEventListener('onsubmit', (e) => {
  e.preventDefault();
});

calculateProfits(0, 0);

const addRowBtn = document.querySelector('#add-row-btn');
const genRandRowBtn = document.querySelector('#gen-rand-row');
const clearRowsBtn = document.querySelector('#clear-rows');
const addRowSubmit = document.querySelector('#add-row-submit');
const tableContent = document.querySelector('#table-content');

const date = new Date();
const year = date.getFullYear();
const day = date.getDate();
const month = date.getMonth() + 1;
const today = `${year}-${month < 10 ? '0' + month : month}-${
  day < 10 ? '0' + day : day
}`;
let revenue = 0,
  costs = 0;

addRowSubmit.addEventListener('click', async () => {
  const UIdate = document.querySelector('#date').value,
    UIrevenue = document.querySelector('#revenue').value,
    UIcosts = document.querySelector('#costs').value;

  if (UIrevenue === '' || UIcosts === '') {
    window.alert('Wypełnij pole przychód oraz koszty');
  } else {
    revenue += parseInt(UIrevenue);
    costs += parseInt(UIcosts);

    generateRow(UIdate, UIrevenue, UIcosts);

    await clearForm();
    await calculateProfits(revenue, costs);
  }
});

genRandRowBtn.addEventListener('click', async () => {
  const randomRevenue = await randomNumber();
  const randomCost = await randomNumber();

  revenue += randomRevenue;
  costs += randomCost;

  await generateRow(await getRandomDate(), randomRevenue, randomCost);
  await calculateProfits(revenue, costs);
});

clearRowsBtn.addEventListener('click', async () => {
  await clearRows();
});

function clearRows() {
  return new Promise(async (resolve) => {
    while (tableContent.lastChild) {
      tableContent.lastChild.remove();
    }

    revenue = 0;
    costs = 0;

    await calculateProfits(revenue, costs);

    resolve();
  });
}

function randomNumber() {
  return new Promise((resolve) => {
    const crypto = window.crypto;
    let random = new Uint16Array(1);

    crypto.getRandomValues(random);

    random = random[0];

    random = Math.round(random / 1000) * 1000;

    resolve(random);
  });
}

function generateRow(date, _revenue, _costs) {
  return new Promise((resolve) => {
    if (_revenue === '' || _costs === '') {
      return;
    } else {
      date = date === '' ? today : date;

      let row = document.createElement('tr');

      row.innerHTML = `
        <td>${date}</td>
        <td class="green-text">${_revenue} <span>zł</span></td>
        <td class="red-text">${_costs} <span>zł</span></td>
        <td class="${_revenue - _costs > 0 ? 'green' : 'red'}-text">
          ${_revenue - _costs} <span>zł</span>
          <a href="#!" class="right clear-row"
                ><i class="material-icons grey-text text-darken-3"
                  >clear</i
                ></a
              >
        </td>
        `;

      row.addEventListener('click', (e) => {
        if (e.target.tagName.toLowerCase() === 'i') {
          revenue -= _revenue;
          costs -= _costs;

          calculateProfits(revenue, costs);

          e.target.parentElement.parentElement.parentElement.remove();
        }
      });

      tableContent.appendChild(row);
    }

    resolve();
  });
}

function clearForm() {
  return new Promise((resolve, reject) => {
    let date = document.querySelector('#date'),
      revenue = document.querySelector('#revenue'),
      costs = document.querySelector('#costs');

    date.value = null;
    revenue.value = null;
    costs.value = null;

    resolve();
  });
}

function calculateProfits(revenue = 0, costs = 0) {
  return new Promise((resolve) => {
    document.querySelector('#totalIncome').textContent = `${revenue} zł`;
    document.querySelector('#totalCosts').textContent = `${costs} zł`;
    document.querySelector('#totalProfits').textContent = `${
      revenue - costs
    } zł`;

    if (revenue - costs > 0) {
      document.querySelector('#totalProfits').classList.remove('red-text');
      document.querySelector('#totalProfits').classList.add('green-text');
    } else {
      document.querySelector('#totalProfits').classList.remove('green-text');
      document.querySelector('#totalProfits').classList.add('red-text');
    }

    resolve();
  });
}

async function getRandomDate() {
  const url = 'https://random-data-api.com/api/users/random_user';

  const res = await axios.get(url);

  return res.data.date_of_birth;
}
