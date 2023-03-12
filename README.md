# Sayakaya Techincal Test Solution

## Scenario

Implement a daily scheduler with the purpose of sending a Happy
Birthday email / WhatsApp message and dynamically create a Promo that is valid for the current
date & current verified birthday users only. The user is then able to buy any Sayakaya product
using the created Promo.

## Flowchart Diagram

![Flowchart Diagram](/assets/flowchart.png "Flowchart Diagram")

The task scheduler will run at 00:00 am everyday. If there is no user with the birthday for the current date then the scheduler will take no further step and reset. Creating promo and sending email will be done asynchronously because each process has no depedency with each other. Every succesfull event will be store in a log for telemetric purpose.

## Table Design

<iframe width="560" height="315" src='https://dbdiagram.io/embed/640dfa15296d97641d874a48'> </iframe>

Assuming there will be a lot of user in the system, user birthday will be indexed so the scheduler query can run faster. To limit the promos usage for specific user and date, the promos table will hold the maximum date the promos can be use (end of the same day at 23:59) and store the corresponding user with its id. The log table is for storing log message of event and can be replaced with real logging server (kibana, prometheus, etc).

## Tech Stack

- Typescript
- Prisma
- PosgtreSQL
- Docker
- Express

This repository also include a REST API to check created promo for user and explore scheduler log.

## How To Run

copy example environment (default for docker build):

```bash
cp env.example env
```

run using docker:

```bash
docker-compose up
```

run using yarn:

```bash
yarn

yarn build

yarn start:prod
```

Access the REST API in http://localhost:5000

- Check all user and available promo:

```json
[GET] http://localhost:5000/user/promo
```

- Check all logs:

```json
[GET] http://localhost:5000/log
```
