<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

<p align="center">
<a href="https://nodejs.org/en" target="_blank"><img src="https://img.shields.io/badge/Node.js-84ba64?style=plastic&logo=nodedotjs&logoColor=white" alt="Node.js" /></a>
<a href="https://www.mysql.com" target="_blank"><img src="https://img.shields.io/badge/mysql-00608b?style=plastic" alt="mysql" /></a>
<a href="https://typeorm.io" target="_blank"><img src="https://img.shields.io/badge/typeorm-E83524?style=plastic&logo=Typeorm&logoColor=white" alt="typeorm" /></a>
<a href="https://www.passportjs.org" target="_blank"><img src="https://img.shields.io/badge/OAuth-passport-35df79?style=plastic&logo=passport" alt="passport" /></a>
<a href="https://www.typescriptlang.org" target="_blank"><img src="https://img.shields.io/badge/typescript-3178c6?style=plastic&logo=typescript&logoColor=white" alt="typescript" /></a>
</p>

# nestjs-oauth2-jwt

Google OAuth2 authentication with jwt token and refresh token (token setting in cookie)

### Install Dependencies

This project needs some dependencies. Let's go install it.

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

```

## Create environment

Make your own environment file with a copy of `env.example` and adjust values to suit your own environment.

```bash
cp .env.example .env
```

## Notic
In this repository,I was created a DatabaseModule based on the TypeORM package from scratch using custom providers mechanism.([SQL(TypeORM)](https://docs.nestjs.com/recipes/sql-typeorm))<br>
As a consequence, this solution contains a lot of overhead that you can omit using ready to use and available out-of-the-box dedicated @nestjs/typeorm package. To learn more, see [here](https://docs.nestjs.com/techniques/database)
