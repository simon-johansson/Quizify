# MusicQuiz

[![Build Status][travis-image]][travis-url]
[![Dependencies][david-deps-image]][david-deps-url]
[![Development Dependencies][david-devdeps-image]][david-devdeps-url]
<!-- ![Status](https://img.shields.io/badge/usability_tested-yes!-FF41A2.svg) -->

> Web based realtime multiplayer quiz. Use your mobile as a controller, up to 8 players.

## Install
Make sure you have Node.js and npm installed.

```bash
$ git clone https://github.com/simon-johansson/Quizify.git && cd Quizify
$ npm install
```

## Development
To start the express server in development mode and the webpack-dev-server:
```bash
$ grunt serve
```
This enables livereload and hot loading for the frontend code but the express server needs to be restarted when making changes to the backend code, i.e. stop the server and run the above command again.

To run the project in production mode:
```bash
$ grunt serve:dist
# or
$ grunt build
$ NODE_ENV=production node server/main.js
```
This will build and compile the webpack code into the `dist/` folder and start the express server with production settings. Good for verifying before deploying.

## Tests
To run all tests:
```bash
$ npm test
```

#### Frontend
To only run the frontend-tests with Karma using PhantomJS:
```bash
$ npm run test-frontend
# or
$ grunt test
```

To watch for file changes and run the frontend tests repeatedly (good for TDD:ing):
```bash
$ grunt test:watch
```

Also possible to grep and isolate specific tests like so:
```bash
$ grunt test:watch --grep="Store"
# or a single run
$ grunt test --grep="Store"
```

#### Backend
To only run the backend-tests with Mocha:
```bash
$ npm run test-backend
```

To grep and isolate specific tests:
```bash
$ npm run test-backend -- --grep="Track"
```

#### Continuous Integration
[Travis CI](https://travis-ci.org/simon-johansson/Quizify) is used for continuously running the tests.

## Deployment
[Heroku](https://www.heroku.com/) is used for hosting. Deployment is done by pusing to the `production` branch. This triggers a new build on Heroku (if the tests pass on Travis-CI).

## Noteworthy
* **Proxy** - A proxy is needed in development mode in order to have both the express and the webpack-dev-server running properly, [info](http://www.christianalfoni.com/articles/2015_04_19_The-ultimate-webpack-setup).

## Stack
#### Font-end
* Webpack
* ES6
* React
* Reflux
* ReactRouter

#### Back-end
* Node.js
* Express
* Socket.io

## Creators
[Simon Johansson](https://github.com/simon-johansson) <br>
[Jose Granjo](https://github.com/josegranjo)

## Licese
??

[travis-image]: https://travis-ci.org/simon-johansson/Quizify.svg?branch=master
[travis-url]: https://travis-ci.org/simon-johansson/Quizify
[david-deps-image]: https://img.shields.io/david/simon-johansson/Quizify.svg
[david-deps-url]: https://david-dm.org/simon-johansson/Quizify
[david-devdeps-image]: https://img.shields.io/david/dev/simon-johansson/Quizify.svg
[david-devdeps-url]: https://david-dm.org/simon-johansson/Quizify#info=devDependencies&view=table
