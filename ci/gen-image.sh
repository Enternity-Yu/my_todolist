#!/usr/bin/env bash
set +x

username=$1
password=$2

timestamp=$(date +%s)
LOCAL_TAG=todolist-frontend:$timestamp
REMOTE_TAG=$username/$LOCAL_TAG

podman login -u "$username" -p "$password"
podman build -t "$LOCAL_TAG" -f Dockerfile .
podman tag "$LOCAL_TAG" "$REMOTE_TAG"
podman push "$REMOTE_TAG"
podman rmi "$REMOTE_TAG"

