class FormValidator {
    constructor(form, fields) {
        this.form = form;
        this.fields = fields;
    }

    initialize() {
        this.validateOnEntry();
        this.validateOnSubmit();
    }

    validateOnEntry() {
        let self = this; //stores the value of the 'this' keyword on the constructor
        this.fields.forEach(field => {
            const input = document.querySelector(`#${field}`);
            input.addEventListener("keyup", () => {
                self.validateInput(input);
            })
        })
    }

    validateOnSubmit() {
        this.form.addEventListener("submit", e => {
            e.preventDefault(); //prevents the default action on the submit button
            button.lastElementChild.style.display = "flex";
            setTimeout(() => { button.lastElementChild.style.display = "none" }, 2000);
        })
    }

    validateInput(field) {
        if (field.value.trim() === "") {
            this.setStatus(field, `${field.getAttribute('name')} cannot be blank!`, "error");
        }
        else {
            if (field.type === "text") {
                return this.validateName(field);
            }

            if (field.type === "email") {
                return this.validateEmail(field);
            }

            if (field.id === "password") {
                return this.validatePassword(field);
            }

            if (field.id === "confirm-password") {
                return this.validatePwdConfirmation(field);
            }
        }
    }

    validateName(field) {
        if (field.value.length > 1) {
            const matchText = /^[a-zA-Z\s][^0-9]+$/;
            if (matchText.test(field.value)) {
                this.setStatus(field, null, "success");
                field.value = field.value.trim();
            }
            else {
                this.setStatus(field, "Use valid characters.", "error");
            }
        }
    }

    validateEmail(field) {
        const matchEmail = /\S+@\S+.\S+/;
        if (matchEmail.test(field.value)) {
            this.setStatus(field, null, "success");
        }
        else {
            this.setStatus(field, "Please input a valid email.", "error");
        }
    }

    validatePassword(field) {
        if (field.value.length < 8) {
            this.setStatus(field, "Password should be 8 characters long.", "error");
        }
        else {
            this.setStatus(field, null, "success");
        }
    }

    validatePwdConfirmation(field) {
        const password = this.form.querySelector('#password');

        if (field.value !== password.value) {
            this.setStatus(field, "Password does not match!", "error");
        }
        else {
            this.setStatus(field, null, "success");
        }
    }

    setStatus(field, message, status) {
        const errorMessage = field.parentElement.querySelector('.error-message');
        const icon = field.parentElement.querySelector('.icon');

        if (status === "success") {
            icon.classList.remove('red');
            icon.classList.add('blue')
            errorMessage.innerHTML = "";
        }

        if (status === "error") {
            icon.classList.remove('blue');
            icon.classList.add('red');
            errorMessage.innerHTML = message;
        }
    }
}

class EnableButton {
    constructor(form, fields) {
        this.form = form;
        this.fields = fields;
    }

    enableButton() {
        this.form.addEventListener("input", e => {
            const firstName = document.querySelector(`#${fields[0]}`);
            const lastName = document.querySelector(`#${fields[1]}`);
            const email = document.querySelector(`#${fields[2]}`);
            const password = document.querySelector(`#${fields[3]}`);
            const pwdConfirmation = document.querySelector(`#${fields[4]}`);
            const checkbox = document.querySelector(`#${fields[5]}`);
            if (this.validName(firstName) && this.validName(lastName) && this.validEmail(email) && this.validPassword(password) && this.validPwdConfirmation(pwdConfirmation) && this.checkedCheckbox(checkbox)) {
                button.disabled = false;
            }
            else {
                button.disabled = true;
            }
        })
    }

    validName(field) {
        const matchText = /^[a-zA-Z\s][^0-9]+$/; //regex to check name format
        if (matchText.test(field.value)) {
            return true;
        }
    }

    validEmail(field) {
        const matchEmail = /\S+@\S+.\S+/; //regex to check email format
        if (matchEmail.test(field.value)) {
            return true;
        }
    }

    validPassword(field) {
        if (field.value.length >= 8) {
            return true;
        }
    }

    validPwdConfirmation(field) {
        const password = this.form.querySelector('#password');
        if (field.value == password.value) {
            return true;
        }
    }

    checkedCheckbox(field) {
        if (field.checked) {
            return true;
        }
    }
}

const form = document.querySelector('.form');
const fields = ["first-name", "last-name", "email", "password", "confirm-password", "checked"];
const button = document.querySelector('button');

const validator = new FormValidator(form, fields);
const btn = new EnableButton(form, fields);
validator.initialize();
btn.enableButton();