from __future__ import absolute_import, unicode_literals

from payment.celery import app
from .access_api.credit_card import credit_card
from .results import result_card


@app.task
def send_payment_credit(data):
    data_credit = credit_card(data)
    return result_card(data_credit)


