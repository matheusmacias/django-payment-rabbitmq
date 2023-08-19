from __future__ import absolute_import, unicode_literals

from payment.celery import app


@app.task
def send_payment_credit(data):
    print('Pagando com cartão de crédito')
