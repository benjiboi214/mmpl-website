#! /bin/bash 

kubectl apply -f tendenci.yml
kubectl rollout restart deployment tendenci-deployment -n mmpl-production
