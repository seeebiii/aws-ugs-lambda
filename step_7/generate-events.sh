#!/usr/bin/env bash

# start sam local before!
open http://localhost:3000/counter

read -p "Continue..." ENTER

# let's generate some sample events
sam local generate-event schedule > schedule-event.json

# invoke our scheduled function with it
#sam local invoke SimpleScheduledFunction -e schedule-event.json

# this should fail... environment variables again!
#sam local invoke SimpleScheduledFunction -e schedule-event.json --env-vars env.json

read -p "Continue..." ENTER

# double-check with API
open http://localhost:3000/counter
