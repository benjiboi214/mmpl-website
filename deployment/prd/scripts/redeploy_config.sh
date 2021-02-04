#! /bin/bash 

kubectl delete -f management_jobs/tendenci/copy_config.yml
kubectl apply -f management_jobs/tendenci/copy_config.yml
