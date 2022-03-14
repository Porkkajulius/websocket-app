# Websocket App:

## Overview

Simple websocket application for monitoring is everything good status

Code structure

- `client/` The web app frontend
- `server/` Server app
- `shared/` Shared functions between `client` and `server`

## Requirements

Mandatory
`Node`

Nice to have
`Docker`

## Run

### With NPM

- `npm install` Install node_modules
- `npm run:start` Starts server and client
- `npm run:start:server` Starts server
- `npm run:start:client` Starts client

### With Docker

server:
`docker-compose up`

client:
Not created use `npm run:start:client`
