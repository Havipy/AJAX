"use strict"
const form = document.querySelector('form');
function sendRequest(metod, url) {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open(metod, url);
		xhr.responseType = 'json';
		xhr.onload = () => {
			if (xhr.status != 200) {
				reject(new Error(`Ошибка ${xhr.status}: ${xhr.statusText}`));
			}
			else {
				resolve(xhr.response);
			}
		}
		xhr.onerror = () => {
			reject(new Error("Запрос не удался"));
		}
		xhr.send();
	})
}
function formsend(event) {

	event.preventDefault();
	let error = formValidate(form);

	if (error === 0) {

		form.classList.add("_sending");

		const gallaryNode = document.querySelector('.gallary');
		gallaryNode.innerHTML = '';

		const url = ` https://picsum.photos/v2/list?limit=${event.currentTarget.querySelector('input').value}`;
		let photos = '';

		sendRequest('GET', url)
			.then((response) => {
				for (let image of response) {
					photos += `<div class="gallary__item"><img src="${image.download_url}"></div>`
				}
				gallaryNode.insertAdjacentHTML("beforeend", photos);
				form.classList.remove("_sending");
				form.reset();
			})
			.catch(err => {

				alert(err);
				form.classList.remove("_sending");
			});
	}
}

function formValidate(form) {
	let error = 0;
	const formReq = form.querySelectorAll('._req');

	for (let input of formReq) {
		formRemoveErr(input);
		const errorLabel = input.nextElementSibling;

		if (errorLabel) {
			errorLabel.remove();
		}
		if (input.value === '') {
			formAddErr(input);
			error++;
			input.parentElement.insertAdjacentHTML("beforeend",
				'<div class="form__error-label">Поле ввода пустое</div>');
		}
		else if (isNaN(+input.value)) {
			formAddErr(input);
			error++;
			input.parentElement.insertAdjacentHTML("beforeend",
				'<div class="form__error-label">Введите число</div>');
		}

		else if (input.value > 9 || input.value < 1) {
			formAddErr(input);
			error++;
			input.parentElement.insertAdjacentHTML("beforeend",
				'<div class="form__error-label">Число вне диапозона</div>');
		}
	}
	return error;
}
function formAddErr(input) {
	input.parentElement.classList.add('_error');
	input.classList.add('_error');
}
function formRemoveErr(input) {
	input.parentElement.classList.remove('_error');
	input.classList.remove('_error');
}
form.addEventListener('click', (event) => {
	const input = event.target.closest('input');
	if (input) {
		const error = input.nextElementSibling
		if (error) {
			error.remove();
		}
	}
})
form.addEventListener('submit', formsend);