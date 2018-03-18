#!/bin/bash

echo "Warning: destroying currently running contianers"
docker kill csgo-poker twitch-chat
docker run  -d -it --rm --name twitch-chat -v $(pwd)/twitch-chat/config.json:/usr/src/app/config.json  -p 3000:3000 twitch-chat:latest
docker run -d -it --rm --name csgo-poker --link twitch-chat:twitch-chat -v $(pwd)/csgo-poker/config.yaml:/usr/src/app/config.yaml csgo-poker:latest


