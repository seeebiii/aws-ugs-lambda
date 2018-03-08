#!/usr/bin/env bash

# start local api
sam local start-api --env-vars env.json -d 5858

# go to http://localhost:3000/counter after that
