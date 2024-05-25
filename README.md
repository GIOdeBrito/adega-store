# Online Store Express

## Requirements

Docker and Docker Compose

## Setting Up

Init a npm repository
npm init -y

Install TypeScript
npm install typescript --save-dev

Init TypeScript configuration file
npx tsc --init

Install Express and their types
npm install --save-dev @types/express

## Virtual Network

To make two or more containers intercommunicate it is necessary
for them to be able to find one another within a network.

List the current docker networks.

```bash
docker network ls
```

It is prudente to manually create a network for the Application and services only.
And then Docker Compose will attach our containers to them automatically.

```bash
docker network create storexpress-net
```

After the proper building of it, one can inspect the network and see what
lies inside.

```bash
docker network inspect storexpress-net
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
