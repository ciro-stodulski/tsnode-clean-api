# tsnode-clean-api

## Setup

1. Create **.env** file in the root folder using **.env.sample** as an example and replace the content with your project configs/secrets.
2. Install development dependencies:
   `npm install`

## Localhost

`npm run dev`

## Lint

`npm run lint`
`npm run lint:fix`

## Testing

`npm test`

## Build

`npm run build`

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