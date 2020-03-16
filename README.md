# Poké-Engine
Pokémon clone made with HTML, CSS and Javascript.

# Demo
[Click here](https://pokengine.herokuapp.com/)

# How to play
After load, use arrow keys or WASD keys to move character.

# App
After git cloning go to the project file path and execute in terminal:
```cd path/to/files```
```npm install```
After install npm dependencies exec this:
```node app.js```
Now you can access: http://localhost:3000 (or your default port).

# Config
You can change the character, x and y position and etc. in /js/engine/load.js in fetchSavedData method, changing the values after || (or) operator.
There's a list of playable characters in /css/character.game.css, like: red, leaf, brendan and etc, just need to change the character attribute in this.savedData.

# ToDo List
- [x] Use socket.io to do a multiplayer game.
- Virtual joystick for mobile devices.
- Refatorate the cameraUpdate method.
- Implement backend database with node.js ('ll use mysql for that :P ) for users register.

# License
Poké-Engine is released under the [MIT License](https://opensource.org/licenses/MIT).
