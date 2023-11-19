import json


def result_card(data):
    data_json = json.loads(data)
    payment_response = data_json['charges'][0]['payment_response']['code']
    payment = {
        '20000': result_20000(),
        '10000': 'Pagamento não autorizado pela operadora do cartão.',
        '10001': 'Quantidade de tentativas excedidas. Por favor, não tente novamente.',
        '10002': 'Transação não autorizada pelo emissor do cartão.',
    }
    print(payment[payment_response])
    return payment[payment_response]


def result_20000():
    return 'Pagamento efetuado com sucesso.'