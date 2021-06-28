const changeClassName = (input: HTMLInputElement): void => {
  input.classList.add('invalid');
  input.classList.remove('valid');
};

const setErrMessage = (input: HTMLInputElement, errMessage: string): void => {
  const errContainer = input.nextElementSibling
    .nextElementSibling as HTMLSpanElement;
  errContainer.dataset.error = errMessage;
};
