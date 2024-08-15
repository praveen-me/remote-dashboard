
# TODO: DB user don't have proper access to take dump from db
# #!/bin/bash

# # Load environment variables from .env file if it exists
# if [ -f .env ]; then
#   export $(cat .env | grep -v '#' | awk '/=/ {print $1}')
# fi

# # Set your variables, using environment variables or default values if not set
# REMOTE_HOST="${REMOTE_HOST}"
# REMOTE_USER="${REMOTE_USER}"
# REMOTE_PASSWORD="${REMOTE_PASSWORD}#"
# REMOTE_DB="${REMOTE_DB}"

# LOCAL_DB="${LOCAL_DB}"
# LOCAL_USER="${LOCAL_USER}"
# LOCAL_PASSWORD="${LOCAL_PASSWORD}"
# DB_CONTAINER_NAME="${LOCAL_DB}"

# # Start the Docker Compose service
# cd docker && docker-compose up -d

# # Wait for the local database to be ready
# echo "Waiting for the local database to be ready..."
# until docker exec $DB_CONTAINER_NAME mysql -u$LOCAL_USER -p$LOCAL_PASSWORD -e "SHOW DATABASES;" > /dev/null 2>&1; do
#   sleep 5
# done

# # Get the list of tables from the remote database
# tables=$(docker exec $DB_CONTAINER_NAME bash -c "mysql -h $REMOTE_HOST -u $REMOTE_USER -p'$REMOTE_PASSWORD' -D $REMOTE_DB -e 'SHOW TABLES;' | awk '{ print \$1}' | grep -v '^Tables'")

# # Loop through the tables and export/import each one using SQL queries
# for table in $tables; do
#   echo "Exporting and importing table $table..."

#   echo "mysql -h $REMOTE_HOST -u $REMOTE_USER -p'$REMOTE_PASSWORD' -D $REMOTE_DB -e 'SELECT * FROM \`$table\`' | mysql -u$LOCAL_USER -p'$LOCAL_PASSWORD' $LOCAL_DB"
  
#   # Run a SQL SELECT query to export data and import it directly
#   docker exec $DB_CONTAINER_NAME bash -c "mysql -h $REMOTE_HOST -u $REMOTE_USER -p'$REMOTE_PASSWORD' -D $REMOTE_DB -e 'SELECT * FROM \`$table\`' | mysql -u$LOCAL_USER -p'$LOCAL_PASSWORD' $LOCAL_DB"
  
# done

# echo "Remote database copied to local Docker container successfully."


# TODO: DUMP data from local sql file
#!/bin/bash

# Load environment variables from .env file if it exists
if [ -f .env ]; then
  export $(cat .env | grep -v '#' | awk '/=/ {print $1}')
fi

# Set your variables, using environment variables or default values if not set
REMOTE_HOST="${REMOTE_HOST}"
REMOTE_USER="${REMOTE_USER}"
REMOTE_PASSWORD="${REMOTE_PASSWORD}"
REMOTE_DB="${REMOTE_DB}"

LOCAL_DB="${LOCAL_DB}"
LOCAL_USER="${LOCAL_USER}"
LOCAL_PASSWORD="${LOCAL_PASSWORD}"
DB_CONTAINER_NAME="${LOCAL_DB}"
SQL_FILE_PATH="sql/db_dump.sql" 
SQL_FILE="db_dump.sql" 

# Start the Docker Compose service
cd docker && docker-compose up -d

# Wait for the local database to be ready
echo "Waiting for the local database to be ready..."
until docker exec $DB_CONTAINER_NAME mysql -u$LOCAL_USER -p$LOCAL_PASSWORD -e "SHOW DATABASES;" > /dev/null 2>&1; do
  sleep 5
done

cd ..

# Copy the local SQL file into the Docker container
echo "Copying SQL file into Docker container..."
docker cp $SQL_FILE_PATH $DB_CONTAINER_NAME:/

# Execute the SQL file within the Docker container to dump it into the local database
echo "Executing SQL file in the local database..."
docker exec $DB_CONTAINER_NAME bash -c "mysql -u$LOCAL_USER -p'$LOCAL_PASSWORD' $LOCAL_DB < /$SQL_FILE"

# Optional: Clean up the SQL file from the Docker container
echo "Cleaning up SQL file from the Docker container..."
docker exec $DB_CONTAINER_NAME bash -c "rm /$SQL_FILE"

echo "SQL file successfully executed and cleaned up."
