from django.conf import settings
import requests


def credit_card(data):
    url = 'https://sandbox.api.pagseguro.com/orders'
    headers = {
        'Authorization': 'Bearer ' + settings.TOKEN_PAGSEGURO,
        'Content-Type': 'application/json',
    }

    data = {
        "reference_id": "ex-00001",
        "customer": {
            "name": data['cardholder_name'],
            "email": data['email'],
            "tax_id": data['tax_id'],
            "phones": [
                {
                    "country": "55",
                    "area": "11",
                    "number": "999999999",
                    "type": "MOBILE"
                }
            ]
        },
        "items": [
            {
                "reference_id": "referencia do item",
                "name": "nome do item",
                "quantity": 1,
                "unit_amount": 500
            }
        ],
        "notification_urls": [
            "https://meusite.com/notificacoes"
        ],
        "charges": [
            {
                "reference_id": "referencia da cobranca",
                "description": "descricao da cobranca",
                "amount": {
                    "value": 500,
                    "currency": "BRL"
                },
                "payment_method": {
                    "type": "CREDIT_CARD",
                    "installments": 1,
                    "capture": True,
                    "card": {
                        "encrypted": data['encrypted_card'],
                        "security_code": data['cvv'],
                        "holder": {
                            "name": data['cardholder_name'],
                        },
                        "store": False
                    }
                }
            }
        ]
    }

    response = requests.post(url, headers=headers, json=data)
    print(response.text)

