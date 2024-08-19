# Adega Wine Store

## Requirements

- A Linux Machine (Preferably)
- Docker
- Docker Compose

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


