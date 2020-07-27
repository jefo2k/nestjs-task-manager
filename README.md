<p align="center">NestJs validation POC.</p>

## Description

Simple CRUD using [Nest](https://github.com/nestjs/nest) to explore the framework capabilities.

## Installation

```bash
$ npm install
```

You must have a postgres running in your machine. The default values for database name, user and password could be find in `./src/config/typeorm.config.ts` file.

An optional `./docker-compose.yml` file is provided to easily up and run a postgres instance, but you need to have [Docker](https://www.docker.com/get-started) installed.

To run a postgres from a docker-compose file, first create a docker volume

```bash
docker volume create postgres
```

Then

```bash
docker-compose up
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

  [MIT licensed](LICENSE).
