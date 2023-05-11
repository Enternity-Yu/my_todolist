#!/usr/bin/env bash
set +x

username=$1
password=$2

#LOCAL_TAG=twuc-$TEAM:$SERVICE-$BUILD_NUMBER
#REMOTE_TAG=$ECR_HOST/$LOCAL_TAG

timestamp=$(date +%s)
LOCAL_TAG = todolist-frontend:$timestamp
REMOTE_TAG = $username/$LOCAL_TAG


#podman login -u $username -p $password $endpoint
#
#podman build -t LOCAL_TAG -f ../Dockerfile .
#podman push $REMOTE_TAG
#podman rmi $REMOTE_TAG

podman login -u $username -p $password
podman build -t $REMOTE_TAG  -f ../Dockerfile .
podman push $REMOTE_TAG
podman rmi $REMOTE_TAG

