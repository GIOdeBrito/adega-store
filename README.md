# Adega Wine Store

## Requirements

- A Linux Machine (Preferably)
- Docker
- Docker Compose

## Running the Application

Build and run the container.

```bash
sudo docker-compose up -d --build
```

## Logs

Sometimes the application might break or an unexplainable mysterious behaviour
comes to pass, but fortunately docker logging can be of immense help.

It is important to check the logs in case something peculiar happens.

```bash
sudo docker logs wine-store
```
