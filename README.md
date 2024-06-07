# Online Store Express

## Requirements

- A Linux Machine (Preferably)
- Docker
- Docker Compose

## Virtual Network

To make two or more containers intercommunicate it is necessary
for them to be able to find one another within a network.

List the current docker networks.

```bash
docker network ls
```

It is prudent to manually create a network for the Application and services only.
And then Docker Compose will attach our containers to them automatically.

```bash
docker network create store-express-net
```

After the proper building of it, one can inspect the network activity and
also see what lies inside.

```bash
docker network inspect store-express-net
```

## Running the Application

First, fire up the build of the images.

```bash
sudo docker-compose build --no-cache
```

After that, run the docker compose instruction.

```bash
sudo docker-compose -d
```

## Logs

Sometimes the application might break or an unexplainable mysterious behaviour
comes to pass, but fortunately docker logging can be of immense help.

It is important to check the logs in case something peculiar happens.

```bash
sudo docker logs store-express
```

## Cleaning Up

Sometimes it is necessary to clean up unused docker images that might be lying
around and occupying unnecessary space in the system.

There is an option just for that within the command line.

```bash
sudo docker image prune
```


