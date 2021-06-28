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

console.log(`Logged in: ${checkIsLogged()}`);
