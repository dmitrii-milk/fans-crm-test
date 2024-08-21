To run application add .env file in `server` and `client` folders


server .env should contain:
`DB_HOST`
`DB_PORT`
`DB_NAME`
`DB_USER`
`DB_USER_PASSWORD`
`JWT_SECRET`


client .env should contain:
`ELECTRON_PORT`
`ELECTRON_JWT_TOKEN`
`ELECTRON_API_URL`


also in client folder run `npm instal`;

after run: 

`docker compose up`

from client folder run `npm run start`;
