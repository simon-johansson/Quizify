# Quizify

> Spotify quiz

## Install
Make sure you have Node.js and npm installed.

```bash
$ git clone https://github.com/simon-johansson/Quizify.git && cd Quizify
$ npm install
```

## Development
```bash
$ grunt serve
```
Starts the express and the webpack-dev-server. Livereload and hot loading for client side code but when making changes to the server code the above command needs to be made again.

```bash
$ grunt serve:dist
```
Builds the Webpack project and start the express server with production settings.

### Generators
Front-end has been generated using [Yeoman](http://yeoman.io/) with [`generator-react-webpack`](https://github.com/newtriks/generator-react-webpack). Install with following command to access React and Reflux generators.

```bash
$ npm install -g yo generator-react-webpack
```
Use the following commands to create new components, actions or stores with corresponding test.

* [yo react-webpack:component \<NAME> --rich](https://github.com/newtriks/generator-react-webpack#component)
* [yo react-webpack:action \<NAME>](https://github.com/newtriks/generator-react-webpack#action) (Reflux style action)
* [yo react-webpack:store \<NAME>](https://github.com/newtriks/generator-react-webpack#store) (Reflux style store)


## Tests
Running `grunt test` will run the front-end unit tests with karma. Tests are written using mocha and chai.

## Build & Deployment
Running `grunt build` will build the front-end code and make it available in the `dist/` folder. Run `NODE_ENV=production node server.js` to start the server in production mode.

## Noteworthy
* **Proxy** - A proxy is needed in order to have both the express and the webpack-dev-server running properly, [info](http://www.christianalfoni.com/articles/2015_04_19_The-ultimate-webpack-setup).

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
