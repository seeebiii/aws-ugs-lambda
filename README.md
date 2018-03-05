# aws-ugs-lambda
Source code for my talk at AWS UserGroup in Stuttgart, 8.3.2018

## Notes
- Everything is based on [Serverless Application Model (SAM)](https://github.com/awslabs/serverless-application-model)
- Steps are built on each other => follow the process how a project can grow
- Each `step` can be deployed by executing `./step_x/deploy.sh`.
It requires that you set `LAMBDA_BUCKET` as (environment) variable which is used to upload the Lambda artifact.

## Steps
1. [step_1](./step_1) contains a simple Lambda function using Serverless Application Model (SAM).
The Lambda function is scheduled and executed each 10 minutes.
Deploy it using `./deploy.sh`.
2. [step_2](./step_2) adds a S3 bucket - the Lambda function gets CRUD permissions to access the bucket.
Deploy it using `./deploy.sh`.
3. [step_3](./step_3) adds actual code to the scheduled Lambda function to upload some date to the bucket.
A package.json is added to use the `aws-sdk`.
Deploy it using `./deploy.sh`.
4. [step_4](./step_4) adds a listener Lambda function which is called when a new file has been uploaded to S3.
It will update a counter in a DynamoDB table to count the files in S3 bucket.
In order to support multiple handler functions, a `index.js` was introduced which bundles the single handler functions.
Deploy it using `./deploy.sh`.
5. [step_5](./step_5) adds a Lambda function to be used as an API and retrieve the counter from DynamoDB.
Deploy it using `./deploy.sh`. It will output the URL to access the API.
6. [step_6](./step_6) introduces [SAM Local](https://github.com/awslabs/aws-sam-local).
It requires that you use local environment variables and set a region for working with DynamoDB.
Take a look at `start-sam-local.sh` and execute the single steps.
7. [step_7](./step_7) introduces the invocation of the scheduled Lambda function using SAM local.
It requires that you use local environment variables.
Take a look at `generate-events.sh` and execute the single steps.

## TODO
- add example for using webpack with SAM local
- create short presentation
