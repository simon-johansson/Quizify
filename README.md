# Quizify

[![Build Status][travis-image]][travis-url]

> Web based Spotify multiplayer quiz. Use your mobile as a controller, up to 8 players.

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
This enables livereload and hot loading for the frontend code but when making changes to the backend code the above command needs to be run again.

To run the project in production mode:
```bash
$ grunt serve:dist
# or
$ grunt build
$ NODE_ENV=production node server/main.js
```
Builds and compiles the webpack code into the `dist/` folder and then start the express server with production settings. Good for verifying before deploying.

## Tests
Run all tests:
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
$ grunt test:watch --grep=Store
# or a single run
$ grunt test --grep=Store
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

## Deployment
Deployment is done by pusing to the `production` branch. This will trigger a new build on Heroku (if the tests pass on Travis-CI). Latest build can be found here:
[https://spotifyquiz.herokuapp.com/](https://spotifyquiz.herokuapp.com/)

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
