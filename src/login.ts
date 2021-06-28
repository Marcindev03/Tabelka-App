interface UserInterface {
  username: string;
  password: string;
}

document.querySelector('#loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const usernameInput = document.querySelector('#username') as HTMLInputElement,
    passwordInput = document.querySelector('#password') as HTMLInputElement;

  const username: string = usernameInput.value,
    password: string = passwordInput.value;

  if (!username || !password) {
    if (!username) {
      setErrMessage(usernameInput, 'You must inclide username');
      changeClassName(usernameInput);
    }
    if (!password) {
      setErrMessage(passwordInput, 'You must inclide password');
      changeClassName(passwordInput);
    }
  } else {
    const localStorageUsers = localStorage.getItem('users');
    const users = JSON.parse(localStorageUsers);
    const user: UserInterface = users.map(
      (user: UserInterface) => user.username === username && user
    )[0];

    if (!user) {
      setErrMessage(usernameInput, `User doesn't exist`);
      changeClassName(usernameInput);
    } else {
      if (user.password === password) {
        const form = document.querySelector('#loginForm') as HTMLFormElement;
        form.reset();

        saveLoggedUser();

        window.location.href = 'http://127.0.0.1:5500/admin/dashboard.html';
      } else {
        console.log(user.password, password);
        setErrMessage(passwordInput, 'Invalid password');
        changeClassName(passwordInput);
      }
    }
  }
});
