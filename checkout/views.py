from django.shortcuts import render
from .forms import CreditCardForm, PaymentForm


def index(request):
    payment_forms = {
        'credit_card': CreditCardForm,
    }
    if request.method == 'POST':
        form = PaymentForm(request.POST)
        if form.is_valid():
            print('Forma de pagamento selecionada: ', form.cleaned_data['ch_payment'])
            payment_form = payment_forms[form.cleaned_data['ch_payment']](request.POST)
            if payment_form.is_valid():
                payment_form.pay()

    return render(request, 'checkout.html')
