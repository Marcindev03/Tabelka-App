interface ItemInterface {
  date: string;
  value: number;
  note: string;
}

interface ItemsInterface {
  owner: string;
  data: CostItemInterface[];
}

const changeClassName = (input: HTMLInputElement): void => {
  input.classList.add('invalid');
  input.classList.remove('valid');
};

const setErrMessage = (input: HTMLInputElement, errMessage: string): void => {
  const errContainer = input.nextElementSibling
    .nextElementSibling as HTMLSpanElement;
  errContainer.dataset.error = errMessage;
};

const saveLoggedUser = (username: string) => {
  if (localStorage.getItem('isLogged')) {
    let isLogged: boolean = JSON.parse(localStorage.getItem('isLogged'));
    isLogged = true;
    localStorage.setItem('isLogged', JSON.stringify(isLogged));

    localStorage.setItem('loggedUser', JSON.stringify(username));
  } else {
    localStorage.setItem('isLogged', JSON.stringify(true));
    localStorage.setItem('loggedUser', JSON.stringify(username));
  }
};

const checkIsLogged = (): boolean => {
  if (JSON.parse(localStorage.getItem('isLogged'))) {
    return true;
  } else {
    return false;
  }
};

const generateRow = (
  date: string,
  value: number,
  note: string,
  tableContent: HTMLTableElement
): void => {
  const row = document.createElement('tr');

  row.innerHTML = `
  <td>${date}</td>
  <td class="red-text">$${value}</td>
  <td>${note}</td>
  `;

  tableContent.appendChild(row);
};

const getTodayDate = (): string => {
  const utc: string = new Date().toJSON().slice(0, 10).replace(/-/g, '/');

  return utc;
};

const generateRows = async (
  type: string,
  owner: string,
  tableContent: HTMLTableElement
) => {
  const globalRows: ItemsInterface[] = JSON.parse(localStorage.getItem(type));
  const loggedUserRows: ItemInterface[] = globalRows.filter(
    (e) => e.owner === owner
  )[0].data;

  loggedUserRows.map(({ date, value, note }) => {
    generateRow(date, value, note, tableContent);
  });
};

const menageLogoutButton = (): void => {
  const logoutButton = document.querySelector<HTMLLIElement>('#logout-button');

  if (logoutButton) {
    if (JSON.parse(localStorage.getItem('isLogged'))) {
      logoutButton.addEventListener('click', () => {
        localStorage.setItem('isLogged', JSON.stringify(false));
        localStorage.setItem('loggedUser', JSON.stringify(null));

        window.location.href = 'http://127.0.0.1:5500/index.html';
      });
    } else {
      logoutButton.remove();
    }
  }
};

menageLogoutButton();

console.log(`Logged in: ${checkIsLogged()}`);
