form.innerHTML = `
	<h1 class="form__title">Отображение необходимиого количества картинок с указанной страницы</h1>
	<div class="form__item">
		
		<label for="formWidth" class="form__label">Номер страницы</label>
		<input id="formWidth" type="text" name="width" class="form__input _req">
	</div>
	<div class="form__item">
		<label for="formHeight" class="form__label">Количество картинок</label>
		<input id="formHeight" type="text" name="height" class="form__input _req">
	</div>
	<button type="submit" class="form__buttton">Отобразить</button>
`
const gallaryNode = document.querySelector('.gallary');
let imageStorage = localStorage.getItem("photos");
if (imageStorage) {
	gallaryNode.innerHTML = imageStorage;
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

		else if (input.value < 1 || input.value > 10) {
			formAddErr(input);
			error++;
			input.parentElement.insertAdjacentHTML("beforeend",
				'<div class="form__error-label">Число вне диапозона от 1 до 10</div>');
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
		const url = ` https://picsum.photos/v2/list?page=${inputs[0].value}&limit=${inputs[1].value}`;
		console.log(url);
		const gallaryNode = document.querySelector('.gallary');
		gallaryNode.innerHTML = '';
		let photos = '';
		try {
			const response = await fetch(url);
			let photos = "";
			if (response.status == 200) {
				const images = await response.json();
				for (let image of images) {

					photos += `<div class="gallary__item"><img src="${image.download_url}"></div>`
				}
				console.log(photos);
				localStorage.setItem("photos", photos)
				gallaryNode.insertAdjacentHTML("beforeend", photos);
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

