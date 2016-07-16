/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('spawn.control');
 * mod.thing == 'a thing'; // true
 */
var bodies = {'harvester': [WORK],
      'builder': [WORK, CARRY, MOVE],
      'distributor': [CARRY, MOVE],
      'upgrader': [WORK, CARRY, MOVE]};


var spawnControl = {
    run: function() {
        if(Memory.queue == undefined) {
            Memory.queue = [];
        }
        if(Memory.queue.length && Game.spawns.Spawn1.spawning == null) {
            var stuff = Memory.queue[0];
            var result = Game.spawns.Spawn1.createCreep(stuff[1], undefined, { role: stuff[0] });
            if(!_.isString(result)) {
                console.log("Spawning unit " + stuff[1] + " failed with code " + result + (result == ERR_NOT_ENOUGH_ENERGY ? ". NOT ENOUGH MINERALS" : "."));
            } else {
                Memory.queue.shift();
                console.log("Building " + stuff[0]);
            }
            return result;
        }
    },
    
    build: function(roleString, size=1) {
        var bodyString = bodies[roleString];
        if(roleString == 'harvester') {//kostil
            bodyString = bodyString.concat([MOVE]);
        }
        var curSize = 1;
        while(curSize < size) {
            bodyString = bodyString.concat(bodies[roleString]);
            curSize++;
        }
        spawnControl.addToQueue(roleString, bodyString)
    },
    
    buildBiggest: function(roleString, maxSize=999) {
        var bodyString = bodies[roleString];
        if(roleString == 'harvester') {
            bodyString = bodyString.concat([MOVE]);
        }
        var quality = 1;
        while(Game.spawns.Spawn1.room.energyCapacityAvailable > spawnControl.getPrice(bodyString) && quality < maxSize) {
            bodyString = bodyString.concat(bodies[roleString]);
            quality++;
        }
        spawnControl.addToQueue(roleString, bodyString)
        return bodyString;
    },
    
    getPrice(roleString) {
        var sum = 0;
        //roleString = roleString.split(',');
        for (var i = 0, len = roleString.length; i < len; i++) {
            sum+=BODYPART_COST[roleString[i]];
        }
        return sum;
    },
    // jobtype - part of bodies
    addToQueue: function(jobtype, bodystring) {
        Memory.queue.push([jobtype, bodystring]);
    },
    clearQueue: function() {
        Memory.queue = [];
        return 'Cleared queue successfully';
    }
};

module.exports = spawnControl;
module.exports.bodies = bodies;

