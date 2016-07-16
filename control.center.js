//This module controls the game's strategy, mostly opening game right now.

//buildOrderStep descriptions:
//undefined - starting the game
//0 - building starting units, waiting for the controller upgrade
//1 - waiting for extensions to be built
//2 - extensions built, replace harvesters with one mega harvester + mega distributor
var spawnControl = require('spawn.control');
var bodies = spawnControl.bodies;

var controlCenter = {
    run: function() {
        if(Memory.buildOrderStep == undefined) {
            Memory.buildOrderStep = 0;
            controlCenter.startGame();
        }
        if(Memory.buildOrderStep == 0) {
            if(spawnControl.queue == []) {
                //Game.spawns.Spawn1.room.createConstructionSite(x,y, STRUCTURE_CONTAINER);//build a container under the harvester
            }
            if(Game.spawns.Spawn1.room.controller.level == 2) {
                Memory.buildOrderStep = 1;
                //put down extensions
            }
        }
        //controlCenter.buildBiggest('distributor');
        //Game.spawns.Spawn1.room.energyCapacityAvailable == 500
        //TODO: build the extensions automatically
    },

    startGame: function() {
        console.log("GL HF");
        spawnControl.build('harvester', 2);
        spawnControl.build('distributor');
        spawnControl.build('harvester', 2);
        spawnControl.build('distributor');
        spawnControl.build('upgrader');
        spawnControl.build('distributor');
        spawnControl.build('upgrader');
        spawnControl.build('builder');
        spawnControl.build('builder');
        spawnControl.build('builder');
        //TODO: build container
    }
};




module.exports = controlCenter;