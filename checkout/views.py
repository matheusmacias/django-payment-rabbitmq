from django.http import HttpResponse
from django.shortcuts import render
from django.conf import settings
import requests
from .forms import CreditCardForm, PaymentForm


def generate_public_key(request):
    url = "https://sandbox.api.pagseguro.com/public-keys"

    payload = {"type": "card"}
    headers = {
        "accept": "application/json",
        "Authorization": "Bearer " + settings.TOKEN_PAGSEGURO,
        "content-type": "application/json"
    }

    response = requests.post(url, json=payload, headers=headers, timeout=None)

    return HttpResponse(response.text, content_type='application/json')


def webhook_pagseguro(request):
    print(request.body)
    return HttpResponse(status=200)


def index(request):
    payment_forms = {
        'credit_card': CreditCardForm,
    }
    payment_form = PaymentForm()
    if request.method == 'POST':
        form = PaymentForm(request.POST)
        if form.is_valid():
            print('Forma de pagamento selecionada: ', form.cleaned_data['ch_payment'])
            payment_form = payment_forms[form.cleaned_data['ch_payment']](request.POST)
            print('Forma de pagamento selecionada: ', payment_form)
            if payment_form.is_valid():
                payment_form.save()

    return render(request, 'checkout.html', {'form': payment_form})
