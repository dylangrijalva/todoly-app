if [ ! -f ".env" ]; then
    echo '.env file is required to start the application'
else
    docker-compose up
    docker exec -it api npx prisma migrate dev  
fi