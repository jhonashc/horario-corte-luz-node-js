## Description

Place a description here.

## Setup:

1. Rename `.env.template` to `.env`
1. Update the environment variables in the `.env` file
1. Build the image and run the container:
   ```bash
   $ docker compose up -d
   ```
1. Install dependencies:
   ```bash
   $ npm install
   ```
1. Run migrations:
   ```bash
   $ npx prisma migrate dev
   $ npx prisma generate
   ```
1. Running the app:

   ```bash
   # development mode
   $ npm dev

   # production mode
   $ npm build
   $ npm start
   ```
