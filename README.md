# Poké-Engine
Pokémon clone made with HTML, CSS and Javascript.

# Demo
[Click here](http://ivounicsul.000webhostapp.com/poke-engine/)

# How to play
After load, use arrow keys or WASD keys to move character.

# Config
You can change the character, x and y position and etc. in /js/engine/load.js in getSavedData method, changing the values after || (or) operator.
There's a list of playable characters in /css/character.game.css, like: red, leaft, brendan and etc, just need to change the character attribute in this.savedData.

# ToDo List
- Virtual joystick for mobile devices.
- Refatorate the cameraUpdate method.
- Implement backend database with node.js ('ll use mysql for that :P ) for users register.
- Use socket.io to do a multiplayer game.

# License
Poké-Engine is released under the [MIT License](https://opensource.org/licenses/MIT).
