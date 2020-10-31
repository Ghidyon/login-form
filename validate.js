class FormValidator {
    constructor(form, fields) {
        this.form = form;
        this.fields = fields;
    }

    initialize() {
        this.validateOnEntry();
        this.enableButton();
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
            if (field.type === "email") {
                return this.validateEmail(field);
            }

            if (field.id === "password") {
                return this.validatePassword(field);
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

    enableButton() {
        let self = this;
        this.form.addEventListener("input", e => {
            const email = document.querySelector(`#${fields[0]}`)
            const password = document.querySelector(`#${fields[1]}`)
            if (self.validEmail(email) === true && self.validPassword(password) === true) {
                button.disabled = false;
            }
            else {
                button.disabled = true;
            }
        })
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
}

const form = document.querySelector('.form');
const fields = ["email", "password"];
const button = document.querySelector('button');

const validator = new FormValidator(form, fields);
validator.initialize();