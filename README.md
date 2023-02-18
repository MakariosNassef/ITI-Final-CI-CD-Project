# CI-CD-Project
## Project Overview:
Deploy a web application on GKE using CI/CD Jenkins Pipeline Implement a secure GKE Cluster Deploy and configure Jenkins on GKE then Deploy the backend application on GKE using the Jenkins pipeline.

to connect from your machine to the cluster 
``` aws eks --region us-east-1 update-kubeconfig --name eks --profile default ```


kubectl get sc

kubectl logs deployment/ebs-csi-controller -n kube-system

http://a469745dbd6a74744b8c0a2ba8b9c3a8-2041682426.us-east-1.elb.amazonaws.com/

first 
Setup Jenkins Build Agents on Kubernetes Pods


Docker image build in Kubernetes pod using Kaniko image builder.
kaniko is an open-source container image-building tool created by Google.

image for Kubernetes Using Kaniko

and create 
Create Dockerhub Kubernetes Secret
We have to create a kubernetes secret of type docker-registry for the kaniko pod to authenticate the Docker hub registry and push the image.

Use the following command format to create the docker registry secret. Replace the parameters marked in bold.

kubectl create secret docker-registry dockercred \
    --docker-server=https://index.docker.io/v1/ \
    --docker-username=<dockerhub-username> \
    --docker-password=<dockerhub-password>\
    --docker-email=<dockerhub-email>


Creating the Amazon EBS CSI driver IAM role for service accounts
https://docs.aws.amazon.com/eks/latest/userguide/csi-iam-role.html


Creating an IAM OIDC provider for your cluster
https://docs.aws.amazon.com/eks/latest/userguide/enable-iam-roles-for-service-accounts.html


Add-ons
Enable Amazon Elastic Block Storage (EBS) within my cluster "eks"



---------------------
to get the token for the eks cluster
aws eks get-token --cluster-name eks

to get Kubernetes API server
aws eks describe-cluster --name eks --query "cluster.endpoint" --output text


to get Kubernetes server certificate key
aws eks describe-cluster --name eks --query "cluster.certificateAuthority.data" --output text

and making service account


role.rbac.authorization.k8s.io/jenkins created
rolebinding.rbac.authorization.k8s.io/jenkins created
serviceaccount/jenkins-admin created