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
        console.log(card.hasErrors);
        console.log(card.errors);
        return card.encryptedCard;
    } catch (error) {
        console.error("Ocorreu um erro:", error);
        return null;
    }
}