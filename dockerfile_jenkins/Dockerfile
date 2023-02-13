FROM jenkins/jenkins:lts
USER root
RUN apt-get update && \
    apt-get install apt-transport-https curl gnupg-agent ca-certificates software-properties-common -y && \
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add - && \
    add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable" -y && \
    apt-get update && \
    apt-get install docker-ce docker-ce-cli containerd.io -y && \
    apt-get install git -y


# to run the jenkins as a countainer that countain instlation for docker,  apt-transport-https curl gnupg-agent ca-certificates software-properties-common 
# docker build . -t makar007/jenkins:lts
# sudo docker run -it -d --name jenkins-master -p 8080:8080 -v /var/run/docker.sock:/var/run/docker.sock -v jenkins_home:/var/jenkins_home makar007/jenkins:lts