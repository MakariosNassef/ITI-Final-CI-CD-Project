Project Overview
This project is aimed at deploying a web application on Amazon EKS in AWS using CI/CD Jenkins Pipeline. It involves implementing a secure EKS cluster, deploying and configuring Jenkins on EKS, and then deploying the application using the Jenkins pipeline. A service account is created to call Jenkins-admin for applying and viewing the deployment, pods, services, etc. We also make an AmazonEKS_EBS_CSI_DriverRole and enable Amazon Elastic Block Storage (EBS) within our cluster to use it.

Tools Used in the Project
Jenkins
EKS
Terraform
Kaniko
Docker
Git
Project Execution
Part 1: Infrastructure Overview
The first step is to initialize Terraform and execute a terraform plan. After that, execute terraform apply to build the infrastructure. Install kubectl and the AWS cloud plugin and then add Jenkins on the EKS cluster.

Part 2: Build the Infrastructure
Build the CI/CD Pipeline using Jenkins. Use the following command format to connect from your machine to the cluster: aws eks --region us-east-1 update-kubeconfig --name eks --profile default. Then execute kubectl get sc and kubectl logs deployment/ebs-csi-controller -n kube-system.

After that, create a Docker image in a Kubernetes pod using Kaniko image builder. Create a Dockerhub Kubernetes secret, and create the Amazon EBS CSI driver IAM role for service accounts. For more details, refer to the following links:

Creating the Amazon EBS CSI driver IAM role for service accounts
Creating an IAM OIDC provider for your cluster
Then enable Amazon Elastic Block Storage (EBS) within the cluster "eks". To get the token for the eks cluster, execute aws eks get-token --cluster-name eks. To get the Kubernetes API server, execute aws eks describe-cluster --name eks --query "cluster.endpoint" --output text. To get the Kubernetes server certificate key, execute aws eks describe-cluster --name eks --query "cluster.certificateAuthority.data" --output text.

Part 3: Setup Jenkins Build Agents on Kubernetes Pods
Create an image for Kubernetes using Kaniko.

Conclusion
With these steps, you can deploy a web application on Amazon EKS in AWS using CI/CD Jenkins Pipeline.
