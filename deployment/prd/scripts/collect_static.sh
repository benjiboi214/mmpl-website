#! /bin/bash 

kubectl delete -f management_jobs/tendenci/collect_static.yml
kubectl apply -f management_jobs/tendenci/collect_static.yml
