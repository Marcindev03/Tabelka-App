if (!checkIsLogged()) {
  window.location.href = 'http://127.0.0.1:5500/index.html';
}

(async () => {
  try {
    await generateRows(
      'costs',
      JSON.parse(localStorage.getItem('loggedUser')),
      document.querySelector('#table-content')
    );
  } catch (err) {
    console.error(err);
  }
})();

interface CostItemInterface {
  date: string;
  value: number;
  note: string;
}

interface CostsInterface {
  owner: string;
  data: CostItemInterface[];
}

const addCostForm = document.querySelector('#addCostForm') as HTMLFormElement;

addCostForm.addEventListener('submit', (e): void => {
  e.preventDefault();

  const dateInput = document.querySelector('#date') as HTMLInputElement,
    valueInput = document.querySelector('#value') as HTMLInputElement,
    noteInput = document.querySelector('#note') as HTMLInputElement;

  const tableContent = document.querySelector(
    '#table-content'
  ) as HTMLTableElement;

  const date: string = dateInput.value || getTodayDate(),
    value: number = valueInput.value as unknown as number,
    note: string = noteInput.value;

  if (!value || !note) {
    console.error("Value or note doesn't exist");
  } else {
    const cost: CostItemInterface = {
      date,
      value,
      note,
    };

    saveCost(cost);
    generateRow(date, value, note, tableContent);
    addCostForm.reset();
  }
});

const saveCost = (cost: CostItemInterface): void => {
  if (localStorage.getItem('costs')) {
    const globalCosts: CostsInterface[] = JSON.parse(
      localStorage.getItem('costs')
    );
    const loggedUser: string = JSON.parse(localStorage.getItem('loggedUser'));
    const loggedUserCosts = globalCosts.filter((e) => e.owner === loggedUser);

    loggedUserCosts[0].data.push(cost);

    globalCosts.forEach((e) => (e.owner === loggedUser ? loggedUserCosts : e));

    localStorage.setItem('costs', JSON.stringify(globalCosts));
  } else {
    const costs = [];
    const loggedUser: string = JSON.parse(localStorage.getItem('loggedUser'));
    const userCosts: CostsInterface = {
      owner: loggedUser,
      data: [cost],
    };

    costs.push(userCosts);

    localStorage.setItem('costs', JSON.stringify(costs));
  }
};
