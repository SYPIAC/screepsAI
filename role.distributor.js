var parent = require('bot')

var roleDistributor = {
    run: function(creep) {
        parent.run(creep);

        if(!creep.memory.collecting && creep.carry.energy == 0) {
            creep.memory.collecting = true;
	    }
	    if(creep.memory.collecting && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.collecting = false;
	    }

        if(creep.memory.collecting) {
    		var containers = creep.room.find(FIND_STRUCTURES, { filter: { structureType: STRUCTURE_CONTAINER }});
        	if(containers.length) {
        		var index = 0;
        		while(containers[index].store[RESOURCE_ENERGY] < 50 && index<containers.length-1) { index++; }
        		if(creep.withdraw(containers[index], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        			creep.moveTo(containers[index]);
        		}
        	} else {
	            var drops = creep.room.find(FIND_DROPPED_ENERGY);
	            if(drops.length) {
	                if(creep.pickup(drops[0])==ERR_NOT_IN_RANGE) {
	                    creep.moveTo(drops[0], {ignoreRoads: true});//carriers move the same speed on and off road, speed up the search
	                }
	            }
	        }
        } 
        if(!creep.memory.collecting) {
            if(creep.memory.targetID != undefined) {
                var target = Game.getObjectById(creep.memory.targetID);
                if(target.energy == target.energyCapacity) {
                    creep.memory.targetID = undefined;
                    roleDistributor.run(creep);
                }
                if(creep.transfer(target, RESOURCE_ENERGY)==ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {ignoreRoads: true});
                }
            } else {
                var targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_EXTENSION ||
                                    structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;
                        }
                });
                targets = _.sortBy(targets, function(x) {
                  return creep.pos.getRangeTo(x.pos);
                });
                if(!targets.length) {
                	targets[0] = creep.room.storage;
                }
                creep.memory.targetID = targets[0].id;
                roleDistributor.run(creep);
            }
        }
    }
};

module.exports = roleDistributor;
