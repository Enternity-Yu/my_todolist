#!/usr/bin/env bash
set +x

LOCAL_TAG=twuc-$TEAM:$SERVICE-$BUILD_NUMBER
REMOTE_TAG=$ECR_HOST/$LOCAL_TAG

username=$(cat /etc/docker-registry/username)
password=$(cat /etc/docker-registry/password)
endpoint=$(cat /etc/docker-registry/endpoint)

podman login -u $username -p $password $endpoint

podman build -t $REMOTE_TAG -f ci/Dockerfile .
podman push $REMOTE_TAG
podman rmi $REMOTE_TAG
