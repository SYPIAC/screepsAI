var parent = require('bot')

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        parent.run(creep);
        // var tower = Game.getObjectById('08a9c29f9c649ef68a9458ff');
        // if(tower) {
        //     var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
        //         filter: (structure) => structure.hits < structure.hitsMax
        //     });
        //     if(closestDamagedStructure) {
        //         tower.repair(closestDamagedStructure);
        //     }
        //     var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        //     if(closestHostile) {
        //         tower.attack(closestHostile);
        //     }
        // }
        
	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	    }

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
	    }
	    else {
	        var spawn = creep.room.find(FIND_MY_SPAWNS);
	        //don't take spawn energy if there's a unit in bulding queue
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

module.exports = roleBuilder;