#!/usr/bin/env bash
set +x

username = ${{ secrets.DOCKER_USERNAME }}
password = ${{ secrets.DOCKER_PASSWORD }}

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

docker build -t $LOCAL_TAG -f ../Dockerfile .
docker push your-dockerhub-account/$LOCAL_TAG
docker rmi $REMOTE_TAG