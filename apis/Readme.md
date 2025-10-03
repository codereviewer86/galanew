## Running Server
yarn dev

## Running Test Cases
yarn test

## Running Scripts
yarn run:script

## Docker Deployment
docker build -t turkmen-gala-api .
docker run -p 5000:5000 --name turkmen-gala-api -d turkmen-gala-api

Note: 
Make sure you change the PORT & BASE_URL in .env file which should match the above port in docker run command
PORT = 5000
BASE_URL = http://localhost:5000

## PM2 Deployment
npm run deploy:prod