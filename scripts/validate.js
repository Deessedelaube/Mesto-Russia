const showInputError = (formElement, inputElement, errorMessage,obj) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(obj.inputErrorClass);
  inputElement.classList.remove(obj.inputValidClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(obj.errorClass);
};

const hideInputError = (formElement, inputElement,obj) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(obj.inputErrorClass);
  inputElement.classList.add(obj.inputValidClass);
  errorElement.classList.remove(obj.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement,obj) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage,obj);
  } else {
    hideInputError(formElement, inputElement,obj);
  }
};
const hasInvalidInput = (inputList) =>{
  return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
  })
};
const toggleButtonState = (inputList, buttonElement, obj) =>{
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(obj.inactiveButtonClass);
  } else{
    buttonElement.classList.remove(obj.inactiveButtonClass);
  }
};
const validityhandler =(formElement, inputElement, obj,inputList,buttonElement)=>{
  checkInputValidity(formElement, inputElement, obj);
  toggleButtonState(inputList,buttonElement,obj);
};

const setEventListeners = (formElement,obj) => {
  const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
  const buttonElement = formElement.querySelector(obj.submitButtonSelector);

  toggleButtonState(inputList,buttonElement,obj);
//валидируем форму профиля при открытии
  if (formElement.closest('.popup').classList.contains('popup_profile')){
  formElement.closest('.popup').addEventListener('mouseover', function() {
    inputList.forEach((inputElement)=>{
      validityhandler(formElement, inputElement, obj,inputList,buttonElement);
      });
    });
  };

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      validityhandler(formElement, inputElement, obj,inputList,buttonElement);
    });
  });
};

const enableValidation = (obj) => {
  const formList = Array.from(document.querySelectorAll(obj.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement,obj);
  });
};

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.button_type_save',
  inactiveButtonClass: 'button_type_save_disabled',
  inputErrorClass: 'form__input_type_error',
  inputValidClass: 'form__input_type_valid',
  errorClass: 'form__error_visible'
});
