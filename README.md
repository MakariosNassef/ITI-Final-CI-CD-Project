# CI-CD-Project
## Project Overview:
Deploy a web application on GKE using CI/CD Jenkins Pipeline Implement a secure GKE Cluster Deploy and configure Jenkins on GKE then Deploy the backend application on GKE using the Jenkins pipeline.

to connect from your machine to the cluster 
``` aws eks --region us-east-1 update-kubeconfig --name eks --profile default ```


kubectl get sc

kubectl logs deployment/ebs-csi-controller -n kube-system

http://a469745dbd6a74744b8c0a2ba8b9c3a8-2041682426.us-east-1.elb.amazonaws.com/


image for Kubernetes Using Kaniko

Creating the Amazon EBS CSI driver IAM role for service accounts
https://docs.aws.amazon.com/eks/latest/userguide/csi-iam-role.html


Creating an IAM OIDC provider for your cluster
https://docs.aws.amazon.com/eks/latest/userguide/enable-iam-roles-for-service-accounts.html


Add-ons
Enable Amazon Elastic Block Storage (EBS) within my cluster "eks"



