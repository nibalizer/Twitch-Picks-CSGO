#!/bin/bash

docker run -it --rm -v $(pwd)/twitch-chat/config.json:/usr/src/app/config.json  -p 3000:3000 twitch-chat:latest

