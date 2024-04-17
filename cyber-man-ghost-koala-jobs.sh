#!/bin/bash
echo "Preparing Ghost Koala Jobs..."
PROJECT_PATH="/home/ubuntu/services/ghost-koala-jobs"
echo "Creating $PROJECT_PATH"
mkdir -p $PROJECT_PATH
echo "console.log('init Ghost Koala Jobs');" > $PROJECT_PATH/server.js
pm2 start $PROJECT_PATH/index.js --name "Ghost Koala Jobs"
