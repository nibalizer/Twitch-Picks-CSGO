#!/bin/bash

docker run  -d -it --rm -v $(pwd)/twitch-chat/config.json:/usr/src/app/config.json  -p 3000:3000 twitch-chat:latest
docker run -d -it --rm -v $(pwd)/csgo-poker/config.yaml:/usr/src/app/config.yaml csgo-poker:latest


