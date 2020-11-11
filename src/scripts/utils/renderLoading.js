export function renderLoading(formElem, isLoading){
if (isLoading){
  formElem.querySelector('.button_type_save').textContent = 'Сохранение...';
} else {
  formElem.querySelector('.button_type_save').textContent = formElem.querySelector('.button_type_save').value;
}
}

