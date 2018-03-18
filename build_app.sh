#!/bin/bash

pushd twitch-chat
docker build -t twitch-chat .
popd

pushd csgo-poker
docker build -t csgo-poker .
popd
