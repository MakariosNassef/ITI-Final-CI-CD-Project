# FROM python:alpine3.16
# WORKDIR /app
# RUN apt-get update
# RUN apt-get install python3-pip -y
# COPY requirements.txt .
# RUN pip install -r requirements.txt
# COPY . .
# ENTRYPOINT [ "python3" ,"hello.py" ]

FROM python:alpine3.16
WORKDIR /app
RUN apk add --no-cache py3-pip
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
ENTRYPOINT [ "python3" ,"hello.py" ]


