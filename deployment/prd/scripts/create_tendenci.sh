#! /bin/bash 

kubectl apply -f pvc-tendenci.yml
kubectl apply -f management_jobs/tendenci/initial_setup.yml
kubectl apply -f file-explorer.yml