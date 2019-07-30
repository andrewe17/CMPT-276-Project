# Ninja-Dash

Ninja-Dash is a multiplayer arena fighting game developed using Node.js and Phaser.io. A user will be able to login, play the game, and chat with other players. The game itself is played in bird’s eye perspective with 2D graphics. Players are placed in a map randomly and compete for the highest kills (and lowest deaths). Basic controls include the WASD keys for movement, space for dashing, and left mouse click for attacking using weapons. Upon death, users respawn in a random location on the map. The map consists of various obstacles that impact player movement. There is a multiplayer aspect implemented using socket.IO. There is also the OpenWeatherMap API implemented to change the map settings depending on real-time weather. This weather feature affects things like player movement and vision.

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku CLI](https://cli.heroku.com/) installed.

```sh
$ git clone https://github.com/andrewe17/ninja-dash # or clone your own fork
$ cd ninja-dash
$ npm install
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku

```
$ heroku create
$ git push heroku master
$ heroku open
```
or

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)
