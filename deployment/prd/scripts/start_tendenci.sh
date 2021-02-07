#! /bin/bash 

kubectl rollout restart deployment file-explorer-deployment -n mmpl-production
kubectl apply -f tendenci.yml