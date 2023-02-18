FROM python:3.7
WORKDIR /app
RUN apt-get update
RUN apt-get install python3-pip -y
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
ENTRYPOINT [ "python3" ,"hello.py" ]
