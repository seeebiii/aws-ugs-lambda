#!/usr/bin/env bash

# start sam local before!
open http://localhost:3000/counter

read -p "Open http://localhost:3000/counter ..." ENTER

# let's generate some sample events
echo "Generating sample event..."
sam local generate-event schedule > schedule-event.json
read -p "Generated schedule-event.json - continue ..." ENTER

# invoke our scheduled function with it
read -p "Invoking the scheduled function with generated event data..." ENTER
sam local invoke SimpleScheduledFunction -e schedule-event.json
read -p "Invoked scheduled function - shoud have failed due to missing environment variables..." ENTER

# this should fail... environment variables again!
read -p "Invoking scheduled function again..." ENTER
sam local invoke SimpleScheduledFunction -e schedule-event.json --env-vars env.json
read -p "Invoked scheduled function - now double-check increased counter..." ENTER

# double-check with API
open http://localhost:3000/counter
