const cardNumberInput = document.getElementById('card-number-input');
cardNumberInput.addEventListener('input', formatCardNumber);

const expiryDateInput = document.getElementById('expiry-date-input');
expiryDateInput.addEventListener('input', formatExpiryDate);

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