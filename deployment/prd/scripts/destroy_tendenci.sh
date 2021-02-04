#! /bin/bash 

kubectl delete -f tendenci.yml
kubectl delete -f file-explorer.yml
kubectl delete -f management_jobs/tendenci/initial_setup.yml
kubectl delete -f pvc-tendenci.yml

aws s3 --endpoint=https://sfo3.digitaloceanspaces.com --profile dospaces rm s3://prod.static/mmpl/tendenci/ --recursive