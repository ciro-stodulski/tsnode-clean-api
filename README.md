# tsnode-clean-api

design based on clean architecture

 https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html
 
## Main stacks used

- typescript
- express
- rabbitmq
- axios
- knex
- mongoose
- redis
- mocha
- graphql
- grcp
 
## Setup

1. Create **.env** file in the root folder using **.env.sample** as an example and replace the content with your project configs/secrets.
2. Install development dependencies:
   `npm install`
3. Init infrastructure: 
  `docker-compose up -d`
4. Create structure db:
  `npm run migration:latest`

## Localhost

`npm run dev`

## Lint

`npm run lint`
`npm run lint:fix`

## Testing

`npm test`

## Build

`npm run build`

## Docker 

docker build -t tsnode-clean-api . 

## CLI

- Dev (TS):
  - `npm run cli-dev -- <command> <arg>`
  - `yarn cli-dev <command> <arg>`
- PRD (JS):
  - `npm run cli -- <command> <arg>`
  - `yarn cli <command> <arg>`

| Description | Command               | Short           |
| ----------- | --------------------- | --------------- |
| Help        | `--help`              | `-h`            |
| List jobs   | `--list-jobs`         | `-lj`           |
| Run job     | `--run-command <command_name>` | `-rj <command_name>` |

```
Ex:
- npm run cli -- -rc "list-todo"
- npm run cli-dev -- -lc
- npm run cli-dev -- --help
- yarn cli-dev -lc

