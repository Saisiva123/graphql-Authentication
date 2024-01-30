### 1. Clone the repository

git clone https://github.com/Saisiva123/graphql-Authentication/tree/main/Desktop/GraphQl/server

### 2. Go to server directory

npm install

### 3. Start the server

but before this make sure a Mongo Db server is running locally

npm run start:dev

--------------------------------------------------
### If you have docker daemon, then use below coomands to run as containers:

docker build -t graphql/server .
docker run graphql/server

But you should change the connection string inside the connectDb.js file 