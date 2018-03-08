#!/usr/bin/env bash

# searches for template.yaml file and spawns up local APIs (for all Lambda functions which declare an API event)
sam local start-api

# go to http://localhost:3000/counter


# you are missing environment variables - add env.json
#sam local start-api --env-vars env.json


# go to http://localhost:3000/counter
# still not working...


# debugging maybe?
#sam local start-api --env-vars env.json -d 5858


# missing region when calling DynamoDB client in api.js
