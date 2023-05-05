"use strict"

form.innerHTML = `
	<h1 class="form__title">Отображение картинки нужного размера</h1>
	<div class="form__item">
		
		<label for="formWidth" class="form__label">Ширина картинки</label>
		<input id="formWidth" type="text" name="width" class="form__input _req">
	</div>
	<div class="form__item">
		<label for="formHeight" class="form__label">Высота картинки</label>
		<input id="formHeight" type="text" name="height" class="form__input _req">
	</div>
	<button type="submit" class="form__buttton">Отобразить</button>
`

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

		else if (input.value < 100 || input.value > 300) {
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
async function formsend(event) {
	event.preventDefault();
	let error = formValidate(form);
	if (error === 0) {
		const inputs = event.currentTarget.querySelectorAll('input._req');
		const url = `https://picsum.photos/${inputs[0].value}/${inputs[1].value}`;
		console.log(url);
		const gallaryNode = document.querySelector('.gallary');
		gallaryNode.innerHTML = '';
		try {
			const response = await fetch(url);
			if (response.status == 200) {
				let gallaryItemHtml = `<div class="gallary__item"><img src="${response.url}"></div>`
				gallaryNode.insertAdjacentHTML("beforeend", gallaryItemHtml);
			}
			else {
				throw new Error(response.status);
			}
		}
		catch (err) {
			alert(err);
		}
	}
}
form.addEventListener('submit', formsend);

