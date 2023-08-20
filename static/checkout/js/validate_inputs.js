const cardNumberInput = document.getElementById('card-number-input');
cardNumberInput.addEventListener('input', formatCardNumber);
cardNumberInput.addEventListener('keydown', allowOnlyNumbers);

const expiryDateInput = document.getElementById('expiry-date-input');
expiryDateInput.addEventListener('input', formatExpiryDate);
expiryDateInput.addEventListener('keydown', allowOnlyNumbers);

const cvvInput = document.getElementById('cvv');
cvvInput.addEventListener('keydown', allowOnlyNumbers);

const cpf_cnpjInput = document.getElementById('tax_id');
cpf_cnpjInput.addEventListener('keydown', allowOnlyNumbers);

const cardHolderInput = document.getElementById('cardholder-name');
cardHolderInput.addEventListener('keydown', notAllowNumbers);

function formatCardNumber() {
    let cardNumber = cardNumberInput.value.replace(/\s/g, ''); // Remove espaços em branco
    let formattedCardNumber = '';

    for (let i = 0; i < cardNumber.length; i++) {
        if (i > 0 && i % 4 === 0) {
            formattedCardNumber += ' ';
        }
        formattedCardNumber += cardNumber[i];
    }

    cardNumberInput.value = formattedCardNumber;
}

function formatExpiryDate() {
    let expiryDate = expiryDateInput.value.replace(/\s|\//g, ''); // Remove espaços e barras
    let formattedExpiryDate = '';

    if (expiryDate.length > 2) {
        formattedExpiryDate += expiryDate.substr(0, 2) + ' / ' + expiryDate.substr(2);
    } else {
        formattedExpiryDate += expiryDate;
    }

    expiryDateInput.value = formattedExpiryDate;
}

function allowOnlyNumbers(event) {
    const key = event.key;
    const isNumber = /^\d$/.test(key);
    const isBackspace = key === 'Backspace';

    if (!isNumber && !isBackspace) {
        event.preventDefault();
    }
}

function notAllowNumbers(event) {
    const key = event.key;
    const isNumber = /^\d$/.test(key);
    const isBackspace = key === 'Backspace';

    if (isNumber) {
        event.preventDefault();
    }
}

