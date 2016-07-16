//This module controls the game's strategy, mostly opening game right now.

//buildOrderStep descriptions:
//undefined - starting the game
//0 - build starting units, put down roads, wait for the controller upgrade to lvl2
//1 - wait for 500 energy capacity, then build the biggest useful harvester
//2 - try to gather 100% energy in the room
//3 - ??
var spawnControl = require('spawn.control');
var bodies = spawnControl.bodies;

var controlCenter = {
    run: function() {
        switch(Memory.buildOrderStep) {
            case undefined:
                Memory.buildOrderStep = 0;
                controlCenter.startGame();
                break;
            case 0:
                if(spawnControl.queue == []) {
                    //TODO:build some roads(to nearest source and controller)
                }
                if(Game.spawns.Spawn1.room.controller.level == 2) {
                    Memory.buildOrderStep = 1;
                    //TODO:put down extensions
                }
            case 1:
                if(Game.spawns.Spawn1.room.energyCapacityAvailable >= 500) {
                    Memory.buildOrderStep = 2;
                    //TODO:suicide all the small harvesters
                    //TODO:make it so there's one big harvester per node
                    //TODO:build roads over swamps on the way to sources
                    spawnControl.build('harvester', 5);
                    //TODO:figure out the best distributor/carrier for the harvester
                }
            case 2:
                //TODO:figure out what the fuck to do
                break;
        }
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