async function getPublicKey() {
    try {
        const response = await fetch('http://127.0.0.1:8000/checkout/generate_public_key/');
        const data = await response.json();
        return data.public_key;
    } catch (err) {
        console.log(err);
        return null;
    }
}

async function getCard(holder, number, expMonth, expYear, securityCode) {
    try {
        if(number.toString().length !== 16){
            setErrorCardNumber();
            return null;
        }
        const publicKey = await getPublicKey();
        if (!publicKey) {
            console.error("Não foi possível obter a chave pública");
            return;
        }

        const card = PagSeguro.encryptCard({
            publicKey: publicKey,
            holder,
            number,
            expMonth,
            expYear,
            securityCode
        });
        clearErrors();
        if (card.errors && card.errors.length > 0) {
            for (const error of card.errors) {
                if (error.code === "INVALID_NUMBER") {
                    setErrorCardNumber();
                }
                if (error.code === "INVALID_EXPIRATION_MONTH" ||
                    error.code === "INVALID_EXPIRATION_YEAR") {
                    setErrorExpiryDate();
                }
                if (error.code === "INVALID_SECURITY_CODE") {
                    setErrorCvv();
                }
            }
        }
        return card.encryptedCard;
    } catch (error) {
        console.error("Ocorreu um erro:", error);
        return null;
    }
}




