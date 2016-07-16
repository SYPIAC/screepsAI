var parent = require('bot')

var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        parent.run(creep);

        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
	    }
	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.upgrading = true;
	    }

	    if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        else {
            var spawn = creep.room.find(FIND_MY_SPAWNS);
	        if(spawn[0].energy > 2 && Memory.queue.length == 0) {
    	        if(spawn[0].transferEnergy(creep) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(spawn[0]);
                }
            } else { 
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0]);
                }
            }
        }
	}
};

module.exports = roleUpgrader;