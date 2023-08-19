FROM python:3.11.3-bullseye

RUN apt update && apt install -y zsh
RUN sh -c "$(wget -O- https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
RUN chsh -s $(which zsh)

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000

CMD python manage.py makemigrations && python3 manage.py runserver 0.0.0.0:8000