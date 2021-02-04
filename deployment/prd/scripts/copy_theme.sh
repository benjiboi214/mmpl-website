#! /bin/bash 

kubectl delete -f management_jobs/tendenci/copy_theme.yml
kubectl apply -f management_jobs/tendenci/copy_theme.yml
