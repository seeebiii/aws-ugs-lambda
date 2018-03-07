#!/usr/bin/env bash

LAMBDA_BUCKET="${LAMBDA_BUCKET:-}"
STACK_NAME="aws-ugs-lambda"

if [[ "${LAMBDA_BUCKET}" == "" || "${STACK_NAME}" == "" ]]; then
    echo "You must set LAMBDA_BUCKET and STACK_NAME first."
    exit 1;
fi

aws cloudformation package --template-file template.yaml --s3-bucket ${LAMBDA_BUCKET} --output-template-file template.packaged.yaml
aws cloudformation deploy --template-file template.packaged.yaml --stack-name ${STACK_NAME} --capabilities CAPABILITY_IAM

API_URL=$(aws cloudformation describe-stacks --stack-name ${STACK_NAME} --query "Stacks[0].Outputs[?OutputKey == 'ApiUrl'].OutputValue" --output text)
echo "API url: ${API_URL}"
