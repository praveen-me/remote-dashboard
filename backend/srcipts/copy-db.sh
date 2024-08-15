#!/bin/bash

# Set your variables
REMOTE_HOST="remote_host_ip_or_domain"
REMOTE_USER="remote_username"
REMOTE_PASSWORD="remote_password"
REMOTE_DB="remote_db_name"

LOCAL_DB="local_db_name"
LOCAL_USER="root"
LOCAL_PASSWORD="rootpassword"

# Start the Docker Compose service
docker-compose up -d

# Wait for the database to be ready
echo "Waiting for the database to be ready..."
until docker exec local-db mysql -u$LOCAL_USER -p$LOCAL_PASSWORD -e "SHOW DATABASES;" > /dev/null 2>&1; do
  sleep 5
done

# Dump the remote database
mysqldump -h $REMOTE_HOST -u $REMOTE_USER -p$REMOTE_PASSWORD $REMOTE_DB > remote_db_dump.sql

# Copy the dump file into the Docker container
docker cp remote_db_dump.sql local-db:/remote_db_dump.sql

# Execute the MySQL import inside the Docker container
docker exec -i local-db bash -c "mysql -u$LOCAL_USER -p$LOCAL_PASSWORD $LOCAL_DB < /remote_db_dump.sql"

# Clean up the dump file
rm remote_db_dump.sql
docker exec -i local-db rm /remote_db_dump.sql

echo "Remote database copied to Docker container successfully."
