---
tags: []
title: Docker
modified: 2026-04-07T05:27:35Z
---

## Concepts

### Daemon

* background daemon process (dockerd) to manage container lifecycle operations
	* vs. [[podman]] which is daemonless
* containers are ran as root user
* single point of failure, if the daemon stops/crashes, all managed containers may terminate
* can manage container state automatically (auto restart)

### Dockerfile

script of instructions to build an image


### Image

* read-only blueprint for containers
* built from dockerfile
* immutable once built


### Container

A running instance of an image


### Volume

* persistent storage independent from container lifecycle
* managed/created by docker
* used for databases or config files, etc.


### bind mount

* maps a host directory into a container
* similar usage to volumes, but not managed by docker


### network

* virtual networking for cross-container communication
* containers on same network can reach each other by name
* different networks are isolated


### registry

* central store of images
* Docker Hub is default. GHCR, ECR, GAR are alternatives


### tag

* version label for an image (`nginx:1.27`)
* `latest` is just a tag


### context

* directory of files sent to `docker build`
* defines build scope


### entrypoint/CMD

* default command to run when container starts
* `ENTRYPOINT` fixes the binary
* `CMD` gives defaults or args


### docker compose

* defined declaratively in `docker-compose.yml`
* manages multi-container applications as a single unit


## Commands

### Lifecycle

* `docker run --name app <image>` - create and start a container
* `docker ps -a` - list containers
* `docker stop/start/restart app` - manage container state
* `docker rm app` - remove a stopped container
* `docker exec -it app <command>` - exec command inside a container


### Images

* `docker pull <image>:<tag/version>` - download an image
* `docker build -t myapp:dev .` - build from Dockerfile
* `docker images` - list images
* `docker rmi <id>` - remove image
* `docker push myrepo/myapp:dev` - upload image to registry


### Logs & Inspect

* `docker logs -f app` - stream logs
* `docker inspect app` - full json details (config, network, mounts, etc)
* `docker stats` - live cpu/mem usage
* `docker top app` - monitor processes inside container


### Volumes & Networks

* `docker volume create <name>` - creates persistent volume
* `docker run -v <name>:<path> <image>` - use volume
* `docker network create <name>` - create network
* `docker run --network <name> ...` - use/join network


### System Cleanup

- `docker system df` - show disk usage
- `docker system prune -af --volumes` - remove all unused containers, networks, images and volumes


### Compose

* `docker compose build` - rebuild images
* `docker compose config` - validate and view merged config
* `docker compose up -d` - starts services from `docker-compose.yml` in background
* `docker compose down` - stop and remove containers, networks
	* `-v` - also remove volumes defined in compose file
* `docker compose ps` - show service status
* `docker compose logs -f` - show logs of all services
* `docker compose exec <container> <command>` - exec command in running container

