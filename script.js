class FormValidator {
    constructor(form, fields) {
        this.form = form;
        this.fields = fields;
    }

    initialize() {
        this.validateOnEntry();
        this.validateOnSubmit();
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

            if (field.type === "checked") {
                return this.validateCheckbox(field);
            }
        }
    }

    validateName(field) {
        if (field.value.length > 1) {
            const matchText = /^[a-zA-Z\s][^0-9]+$/;
            if (matchText.test(field.value)) {
                this.setStatus(field, null, "success");
                return true;
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
            return true;
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
            return true;
        }
    }

    validatePwdConfirmation(field) {
        const password = this.form.querySelector('#password');

        if (field.value !== password.value) {
            this.setStatus(field, "Password does not match!", "error");
        }
        else {
            this.setStatus(field, null, "success");
            return true;
        }
    }

    validateCheckbox(field) {
        if (field.checked) {
            return true;
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

    validateOnSubmit() {
        let self = this; //stores the value of the 'this' keyword on the constructor

        this.form.addEventListener("submit", e => {
            e.preventDefault(); //prevents the default action on the submit button
            self.form.submit();
            /* self.fields.forEach(field => {
                const input = document.querySelector(`#${field}`);
                self.validateInput(input);
            }) */
        })
    }

    validateOnEntry() {
        let self = this; //stores the value of the 'this' keyword on the constructor
        this.fields.forEach(field => {
            const input = document.querySelector(`#${field}`);
            input.addEventListener("input", () => {
                self.validateInput(input);
            })
        })
    }

}

const form = document.querySelector('.form');
const fields = ["first-name", "last-name", "email", "password", "confirm-password", "checked"];
const button = document.querySelector('button');

const validator = new FormValidator(form, fields);
validator.initialize();