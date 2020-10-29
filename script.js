class FormValidator {
    constructor(form, fields) {
        this.form = form;
        this.fields = fields;
    }

    initialize() {
        this.validateOnSubmit();
        this.validateOnEntry();
    }

    validateInput(field) {
        if (field.value.trim() === "") {
            return this.setStatus(field, `${field.getAttribute('name')} cannot be blank!`, "error");
        }
    }

    setStatus(field, message, status) {
        const errorMessage = field.parentElement.querySelector('.error-message');
        const icon = field.parentElement.querySelector('.icon');

        if (status === "success") {
            icon.classList.remove('red')
            errorMessage.innerHTML = "";
        }

        if (status === "error") {
            icon.classList.add('red');
            errorMessage.innerHTML = message;
        }
    }

    validateFields() {
        let self = this; //stores the value of the 'this' keyword on the constructor

        this.fields.forEach(field => {
            const input = document.querySelector(`#${field}`);
            self.validateInput(input);
        })
    }

    validateOnSubmit() {
        let self = this; //stores the value of the 'this' keyword on the constructor

        this.form.addEventListener("submit", e => {
            e.preventDefault(); //prevents the default action on the submit button
            self.validateFields();
        })
    }

    validateOnEntry() {
        let self = this; //stores the value of the 'this' keyword on the constructor

        this.form.addEventListener("input", event => {
            self.validateFields();
        })
    }


}

const form = document.querySelector('.form');
const fields = ["first-name", "last-name", "email", "password", "confirm-password", "checked"];

const validator = new FormValidator(form, fields);
validator.initialize();