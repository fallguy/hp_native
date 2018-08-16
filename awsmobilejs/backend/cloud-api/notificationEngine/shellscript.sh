#!/bin/bash
rm /tmp/server0.sock
MOBILE_HUB_DYNAMIC_PREFIX=happyplaceapp-mobilehub-1689228557 \
MOBILE_HUB_PROJECT_ID=b7429004-6cdf-4f46-a3d2-a59bdb134c1e MOBILE_HUB_PROJECT_NAME=HappyPlaceApp \
MOBILE_HUB_PROJECT_REGION=us-west-2 AWS_REGION=us-west-2 REGION=us-west-2 \
AWS_DEFAULT_REGION=us-west-2 AWS_PROFILE=hp lambda-local -l lambda.js -h handler -e $1
