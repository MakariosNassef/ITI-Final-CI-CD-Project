# EKS-Jenkins-CI/CD-Web-App-Deployment
## Project Overview
This project is aimed at deploying a web application on Amazon EKS in AWS using CI/CD Jenkins Pipeline. It involves implementing a secure EKS cluster, deploying and configuring Jenkins on EKS, and then deploying the application using the Jenkins pipeline. A service account is created to call Jenkins-admin for applying and viewing the deployment, pods, services, etc. We also make an AmazonEKS_EBS_CSI_DriverRole and enable Amazon Elastic Block Storage (EBS) within our cluster to use it.

## Tools Used in the Project
 - Jenkins: Continuous Integration/Continuous Deployment (CI/CD) server used to automate building, testing, and deploying the web application.
 - EKS: Amazon Elastic Kubernetes Service (EKS) is a managed Kubernetes service used to deploy and manage the web application in a secure and scalable manner.
 - Terraform: Infrastructure as Code (IaC) tool used to define, provision, and manage the underlying infrastructure required for the web application and its deployment.
 - Kaniko: Open-source tool used to build Docker images within a Kubernetes pod.
 - Docker: Containerization platform used to package the web application and its dependencies into a Docker image.
 - Git: Version control system used to manage the source code of the web application and its configuration files, allowing for collaboration and change tracking among developers.
 - AWS: Amazon Web Services (AWS) is a cloud computing platform used to host and manage the infrastructure and resources required for the project. In this project,AWS is used to host the EKS cluster, Elastic Block Store (EBS), and provide various other resources

## Project Execution
## Part 1: Infrastructure Overview
 - 1- The first step is to to build the infrastructure. 
    - To initialize Terraform:
      ``` terraform init ```
    - To execute a Terraform plan:
      ``` terraform plan ```
    - To apply the Terraform plan and build the infrastructure:
      ``` terraform apply ```

- 2- Install kubectl and the AWS cloud plugin and then 
    - To install kubectl, follow the instructions in the official Kubernetes documentation based on operating system: https://kubernetes.io/docs/tasks/tools/install-kubectl/

- 3- add Jenkins on the EKS cluster using the deployment file.

## Part 2: Build the CI/CD Pipeline using Jenkins.

### This pipeline is designed to build and deploy a Tornado web application using Kubernetes on an EKS cluster. The pipeline consists of the following stages:

 - Get the ITI final project: The pipeline first clones the project from the master branch of the repository.
 - Build a mac project: The pipeline runs a Maven container to build the Tornado web application.
 - Build Tornado Image: The pipeline uses Kaniko to build a Docker image of the Tornado web application and tags it with the current build number.
 - Update Kubernetes deployment and Deploy app to Kubernetes cluster: The pipeline uses kubectl to apply the deployment manifest located in the kubernetes_manifest_file directory. This updates the existing deployment with the new Docker image that was just built.

This pipeline also uses a pod template to specify the container images and volumes that will be used in each stage of the pipeline. 
The pipeline uses a Kubernetes secret named dockercred to store the credentials needed to authenticate with Docker Hub. 
The pipeline also uses a Kubernetes service account named jenkins-admin to authenticate with the Kubernetes cluster.


## to create a Kubernetes secret of type docker-registry. 
```
kubectl create secret docker-registry dockercred \
    --docker-server=https://index.docker.io/v1/ \
    --docker-username=<dockerhub-username> \
    --docker-password=<dockerhub-password>\
    --docker-email=<dockerhub-email>
```



## After deploying the app using the provided pipeline, I can access it using two different services:
 - 1 - LoadBalancer: This service exposes the app to the internet, allowing external users to access it. It creates a public IP address that maps to the app, and distributes incoming traffic to the different pods running the app.
 - 2 - Ingress


### links that help me un this project 

Creating the Amazon EBS CSI driver IAM role for service accounts
https://docs.aws.amazon.com/eks/latest/userguide/csi-iam-role.html

Creating an IAM OIDC provider for your cluster
https://docs.aws.amazon.com/eks/latest/userguide/enable-iam-roles-for-service-accounts.html

Supported Versions table
https://github.com/kubernetes/ingress-nginx#supported-versions-table



### Important command 
- to get the token for the eks cluster
``` aws eks get-token --cluster-name eks ```
- to get Kubernetes API server
``` aws eks describe-cluster --name eks --query "cluster.endpoint" --output text ```
- to get Kubernetes server certificate key
``` aws eks describe-cluster --name eks --query "cluster.certificateAuthority.data" --output text ```
