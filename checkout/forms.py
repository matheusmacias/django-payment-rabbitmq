from django import forms
from django.core.validators import RegexValidator

from .access_api.credit_card import credit_card
from .tasks import send_payment_credit


class PaymentForm(forms.Form):
    PAYMENT_CHOICES = (
        ('credit_card', 'Cartão de crédito'),
        ('debit_card', 'Cartão de débito'),
        ('boleto', 'Boleto'),
        ('pix', 'Pix'),
    )

    ch_payment = forms.ChoiceField(
        label='Forma de pagamento',
        widget=forms.RadioSelect(),
        choices=PAYMENT_CHOICES,
        required=True
    )


class CustomerForm(forms.Form):
    name = forms.CharField()
    email = forms.EmailField()
    tax_id = forms.CharField(validators=[
        RegexValidator(
            regex=r'^\d{11,14}$',
            message='Você deve utilizar um CPF ou CNPJ válido.',
            code='invalid_cpf',
        ),
    ])


class CardForm(CustomerForm):
    encrypted_card = forms.CharField()
    cardholder_name = forms.CharField(min_length=2)
    # card_number = forms.CharField(
    #     validators=[RegexValidator(r'^\d{4} \d{4} \d{4} \d{4}$',
    #                                'Número de cartão inválido')])
    # expiry_date = forms.CharField()
    cvv = forms.CharField()

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['name'].required = False


class CreditCardForm(CardForm):
    def save(self):
        send_payment_credit.delay(self.cleaned_data)
