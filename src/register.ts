interface UserInterface {
  username: string;
  password: string;
}

if (checkIsLogged()) {
  window.location.href = 'http://127.0.0.1:5500/admin/dashboard.html';
}
const form = document.querySelector('#registerForm') as HTMLFormElement;

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const usernameInput = document.querySelector('#username') as HTMLInputElement,
    passwordInput = document.querySelector('#password') as HTMLInputElement,
    cfPasswordInput = document.querySelector(
      '#cf-password'
    ) as HTMLInputElement;

  const username: string = usernameInput.value,
    password: string = passwordInput.value,
    cfPassword: string = cfPasswordInput.value;

  if (!username || !password || !cfPassword || password !== cfPassword) {
    if (!username) {
      setErrMessage(usernameInput, 'You must inclide username');
      changeClassName(usernameInput);
    }
    if (!password) {
      setErrMessage(passwordInput, 'You must inclide password');
      changeClassName(passwordInput);
    }
    if (!cfPassword) {
      setErrMessage(cfPasswordInput, 'You must confirm password');
      changeClassName(cfPasswordInput);
    }
    if (password !== cfPassword) {
      console.log(password, cfPassword);

      setErrMessage(passwordInput, 'Passwords are not the same');
      setErrMessage(cfPasswordInput, 'Passwords are not the same');

      changeClassName(passwordInput);
      changeClassName(cfPasswordInput);
    }
  } else {
    saveUser(username, password);
    saveLoggedUser(username);

    form.reset();

    window.location.href = 'http://127.0.0.1:5500/admin/dashboard.html';
  }
});

const saveUser = (username: string, password: string): void => {
  if (!localStorage.getItem('users')) {
    const users: UserInterface[] = [];
    const user: UserInterface = { username, password };

    users.push(user);

    localStorage.setItem('users', JSON.stringify(users));
  } else {
    let users: UserInterface[] = JSON.parse(localStorage.getItem('users'));
    const user: UserInterface = { username, password };
    users.push(user);

    localStorage.setItem('users', JSON.stringify(users));
  }
};
