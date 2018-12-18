![Travis CI](https://travis-ci.com/chill5018/FlightApp-api.svg?branch=master)

## URLs

The backend system is deployed to [here](https://dt-flight-api.herokuapp.com/api)

The API documentation can be inspected [here](https://app.swaggerhub.com/apis-docs/moonflare/flight-api/1.0.0-oas3)

The build logs -  [Travis CI](https://travis-ci.com/chill5018/FlightApp-api)

## Key Technologies

### Core
* Node.js v8.11.2
* Express.js v4.16.4

### Databases
* PostgresSQL
* Sequelize

### Testing
* mocha
* chai

### Setup

**Prerequisite**
 - `Homebrew` (MacOS)
 - `Chocolatey` (Windows)

**Node**

1. Install `nvm` with `brew install nvm`.
2. Install `node 8.11.2` with `nvm install 8.11.2`.
3. From the root directory of this project, run `nvm use 8.11.2`.
4. Run `npm install`

**Database**

1. Install PostgreSQL on your local machine. The instructions for this very from operating system to operating system.

```bash
$ brew install postgresql
```

2. Start PostgreSQL and run on startup.

```bash
$ brew services start postgresql
```

3. Ensure a `root` user exists on PostgreSQL with no password:

```bash
$ psql --dbname=postgres
postgres=# CREATE USER root;
postgres=# ALTER USER root WITH SUPERUSER;
```

4. Create the database by running:

```bash
$ npm run db:create
```

5. Create the database tables by running:

```bash
$ npm run db:migrate
```

### Testing

To run the tests, simply run

```bash
$ npm run test
```

To generate the code coverage

```bash
$ npm run test:coverage
```
