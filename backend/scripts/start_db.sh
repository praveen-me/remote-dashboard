#!/bin/bash
if [ -f .env ]; then
  export $(cat .env | grep -v '#' | awk '/=/ {print $1}')
fi

# Set your variables, using environment variables or default values if not set
LOCAL_DB="${LOCAL_DB}"
LOCAL_USER="${LOCAL_USER}"
LOCAL_PASSWORD="${LOCAL_PASSWORD}"


# Start the Docker Compose service
cd docker && docker-compose up -d