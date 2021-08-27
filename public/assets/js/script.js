const validator = {
	handleSubmit: (event) => {
		event.preventDefault();

		let send = true;
		let inputs = form.querySelectorAll('input');

		validator.clearErrors();

		for(let i = 0; i < inputs.length; i++) {
			let input = inputs[i];
			let check = validator.checkInput(input);

			if (check !== true) {
				send = false;
				validator.showError(input, check);
			}
		}

		if (send) {
			form.submit();
		}
	},
	checkInput: (input) => {
		let rules = input.getAttribute('data-rules');

		if (rules !== null) {
			rules = rules.split(',');
			for (let j in rules) {
				let ruleDetails = rules[j].split('=');
				switch(ruleDetails[0]) {
					case 'required':
						if (input.value == '') {
							return 'Blank camp';
						}
					break;
					case 'min':
						if (input.value.length < ruleDetails[1]) {
							return `Must have min ${ruleDetails[1]} caracters`;
						}
					break;
					case 'email':
						if (input.value !== '') {
							let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
							if (regex.test(input.value.toLowerCase())) {
								return 'Invalid E-mail';
							}
						}
					break;
				}
			}
		}

		return true;
	},
	showError: (input, error) => {
		input.style.borderColor = '#F00';
		let errorElement = document.createElement('div');
		errorElement.classList.add('error');
		errorElement.innerHTML = error; 
		input.parentElement.insertBefore(errorElement, input.nextElementSibling);
	},
	clearErrors: () => {
		let inputs = form.querySelectorAll('input');
		for (let i = 0; i < inputs.length; i++) {
			inputs[i].style = '';
		}

		let errElements = document.querySelectorAll('.error');
		for (let i = 0; i < errElements.length; i++) {
			errElements[i].remove();
		}
	}
};

const form = document.querySelector('.validator');
form.addEventListener('submit', validator.handleSubmit);