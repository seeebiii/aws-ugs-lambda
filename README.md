# aws-ugs-lambda
Source code for my talk at AWS UserGroup in Stuttgart, 8.3.2018


## Notes
- Everything is based on [Serverless Application Model (SAM)](https://github.com/awslabs/serverless-application-model)
- Steps are built on each other => follow the process how a project can grow
- Each `step` can be deployed by executing `./step_x/deploy.sh`.
It requires that you set `LAMBDA_BUCKET` as (environment) variable which is used to upload the Lambda artifact.


## Preparation
1. Install AWS SDK: `npm install -g aws-sdk`
2. Install SAM Local: `npm install -g aws-sam-local`


## Steps
1. [step_1](./step_1) contains a simple Lambda function written in NodeJS.
It is deployed using Serverless Application Model (SAM).
The Lambda function is scheduled and executed each 10 minutes.
Deploy the example stack using `./deploy.sh`.
2. [step_2](./step_2) adds a S3 bucket - the Lambda function gets CRUD permissions to access the bucket.
Hence, the `template.yaml` contains more resources which should be deployed.
The template is using the new `managed policies` features of SAM, i.e. `S3CrudPolicy` in this case.
Deploy the example stack using `./deploy.sh`.
3. [step_3](./step_3) adds actual code to the scheduled Lambda function.
Now it uploads some sample JSON data to the bucket.
A package.json is added to use the `aws-sdk` and access S3.
Deploy the example stack using `./deploy.sh`.
4. [step_4](./step_4) adds a Lambda function which is called when a new file has been uploaded to S3.
It will update a counter in a DynamoDB table to count the files in S3 bucket.
In order to support multiple handler functions, a `index.js` file was introduced which bundles the single handler functions.
Now, the handler functions are referenced using `index.handlerFunction` in `template.yaml`.
Deploy the example stack using `./deploy.sh`.
5. [step_5](./step_5) adds a Lambda function which is used as an API.
It retrieves the counter from DynamoDB and returns a JSON response when accessing `/counter`.
Deploy the example stack using `./deploy.sh`.
The deploy script will output the URL to access the API.
6. [step_6](./step_6) introduces [SAM Local](https://github.com/awslabs/aws-sam-local).
Take a look at `start-sam-local.sh` and execute the single steps.
It requires that you use local environment variables and set a region for working with DynamoDB.
You can live-edit your API Lambda functions (e.g. `api.js`) and SAM local will directly read the updated file for the next request.
7. [step_7](./step_7) introduces the invocation of the scheduled Lambda function using SAM local.
For that, you can generate an example event using `generate-events.sh`.
This script executes the necessary steps to call the scheduled Lambda function in an appropriate way.
Here, it's also necessary that you use local environment variables with SAM local.
Take a look at `generate-events.sh` and execute the single steps.
8. [step_8](./step_8) introduces [browserify](http://browserify.org/) to create a minified bundle.
However, using minification makes live-updating a Lambda function in combination with SAM local harder.
In order to get the updates when making code changes, you need to link to the minified bundle within your CloudFormation template.
Now, you'll need a way to update this bundle every time you make a change.
This is done by using `chokidar-cli` in `package.json`.
If you run `start-sam-local.sh`, you have to run `yarn run watch` or `npm run watch` as well now.
This will update your bundle each time you make a change in your source files.
Also, the sources files are now placed under `/src` and the bundle is created in `/target`.
The same setup can be used for Java Lambda functions.
9. [step_9](./step_9) shows how to use the global feature of SAM to keep definitions consistent.
Global properties are shared between all functions.
In this example it saves 10% of the template size in `template.yaml`.
This is especially useful for environment variables, so you don't miss some important ones.


## License

MIT License

Copyright (c) 2018 Sebastian Hesse

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
