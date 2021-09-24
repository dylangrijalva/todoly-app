if [ ! -f ".env" ]; then
    echo 'Could not be able to start the app due .env file is missing'
else
    docker-compose up
    docker exec -it api npx prisma migrate dev  
fi