#! /bin/bash 

IMAGE="benjiboi214/mmpl-tendenci"
VERSION="latest"

docker build -t ${IMAGE}:${VERSION} .
docker push ${IMAGE}:${VERSION}