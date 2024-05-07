# IKT221-Chaos-4

In this assignment we are creating a microservices-based application. 
We are using minikube and docker to set this up. 


## 1. Setup

The first thing that is needed to get started, 

```bash
minikube start
eval $(minikube docker-env)
```
Then to be able to use the images that will be created internally in minikube, you will need to run the command below to enable docker.

```bash
npm init -y
npm install express
npm install pg
node server.js
```



## 2. Setting up bookings

Here you need to run the dockerfile in the booking-service folder. 

```bash
docker build -t booking-service booking-service/.
```

Then you need to apply all of the Kubernetes files to be able to run the site:

```bash
kubectl apply -f booking-service/secret.yml
kubectl apply -f booking-service/booking-service-deployment.yml
kubectl apply -f booking-service/booking-service-service.yml
kubectl apply -f booking-service/postgres-deployment.yml
kubectl apply -f booking-service/postgres-pvc-claim-yml
kubectl apply -f booking-service/postgres-service.yml
```

You will also need a ingress, as multiple services uses the same port.

```bash
kubectl apply -f k8s/ingress.yml
```


