#!/bin/bash

pushd twitch-chat
docker build -t twitch-chat .
popd
