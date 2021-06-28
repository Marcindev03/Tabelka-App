interface UserInterface {
  username: string;
  password: string;
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

  if (!username || !password || !cfPassword) {
    if (!username) {
      changeClassName(usernameInput);
    }
    if (!password) {
      changeClassName(passwordInput);
    }
    if (!cfPassword) {
      changeClassName(cfPasswordInput);
    }
  } else {
    const user: UserInterface = { username, password };
    localStorage.setItem('user', JSON.stringify(user));
  }
});

const changeClassName = (input: HTMLInputElement): void => {
  input.classList.add('invalid');
  input.classList.remove('valid');
};
