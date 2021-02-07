#! /bin/bash 
printf "Loki Admin Password:\n"
kubectl get secret --namespace loki-stack loki-grafana -o jsonpath="{.data.admin-password}" | base64 --decode
printf "\n"
kubectl --namespace loki-stack port-forward svc/loki-grafana :80