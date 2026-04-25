---
tags: []
title: Podman
---

## Vs. Docker
* podman is daemonless, as opposed to [[docker]] that has a background daemon (dockerd)
  * this means containers launched through podman are rootless, run under the user's session
  * podman needs to rely on the host system's init system (systemd) or user scripts to auto-manage containers
* podman is more or less a drop-in alternative to docker


## Commands

* `podman run <image>` -- run command in new container
  * `--name` -- set name
  * `-d` -- detached mode, runs in background, prints container ID
  * `-p 8080:80/tcp` -- port forwarding
* `podman ps` -- list running containers
  * `-a` -- all containers
  * `--pod` -- show pod containers belong to
* `podman inspect <name>` -- details about a container
* `podman logs <id>` -- logs from container
* `podman top <id>` -- view container processes via top
* `podman stop <id>` -- stop container
* `podman rm <id>` -- remove container

## Pods

Kubernetes-style container grouping, to share resources or deploy containers together. Alternative to docker compose files.

* `podman pod create --name <pod_name>` -- create an empty pod
  * `--publish 8080:80` -- map ports
* `podman pod ls` -- list all pods
* `podman run --pod <pod_name> <image>` -- add a container to a pod
* `podman pod inspect <pod_name>`
* `podman rm <pod_name>` -- remove pod and all its containers
* `podman pod start <pod_name>`
* `podman pod restart <pod_name>`
* `podman pod pause <pod_name>` -- freeze processes without terminating
* `podman pod unpause <pod_name>`
* `podman pod stop <pod_name>`
* `podman generate kube podname >> podname.yaml` -- create YAML config of pod for kubernetes
* `podman play kube podname.yaml` -- run pod from kubernetes YAML config file

## Links

* https://github.com/containers/podman
