FROM jenkins/jenkins:lts
USER root
RUN apt-get update && \
    apt-get install apt-transport-https curl gnupg-agent ca-certificates software-properties-common -y && \
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add - && \
    add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable" -y && \
    apt-get update && \
    apt-get install docker-ce docker-ce-cli containerd.io -y && \
    apt-get install git -y