# soundBear

Voice-activated music player, which provides variety of useful information for every song that plays.
(Only supports Chrome at the moment)

## Tech Stack

### Front-End

* [React](https://facebook.github.io/react/) along with [Redux](https://github.com/reactjs/redux) for rendering page views state container maintenance
* [D3.js](https://d3js.org/) - library for visualizing data
* [Bootstrap](http://getbootstrap.com/) - a mobile first front-end framework

### Back-End

* [Node.js](https://nodejs.org/en/) with [Express](http://expressjs.com/) for serving pages and handling api requests
* [mySQL](https://www.mysql.com/) as a database
* [Sequelize](http://sequelizejs.com/) - an ORM for Node.js
* [Annyang](https://talater.com/) - SpeechRecognition library

### Testing

* [Mocha](https://mochajs.org/) - test framework
* [Shouldjs](https://shouldjs.github.io/) and [Supertest](https://github.com/visionmedia/supertest) for API tests

### Dev/Build Tools

* [Webpack](https://webpack.github.io/) and [Babel](https://babeljs.io/) for transpiling

## File Structure

    hackify/
    |
    |--db/
    |   |--schema
    |   |
    |--public/
    |   |--assets/
    |   |--styles/
    |   |
    |--spec/
    |   |--client/
    |   |--server/
    |   |
    |--server/
    |   |--helpers
    |   |
    |--src/
    |   |--components/
    |   |--modules/
    |   |--redux/
    |   |--visualization/

## Installing Dependencies

- Mocha for testing

```
$ npm install mocha -g
```

- Webpack for building

```
$ npm install webpack -g
```

- Dependencies installation

```
$ npm install
```

## Starting the App

From the root directory, run ```npm start``` to start the server
Navigate to ```http://localhost:8080```

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for guidelines.

## License

MIT
