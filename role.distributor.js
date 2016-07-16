var parent = require('bot')

var roleDistributor = {
    run: function(creep) {
        parent.run(creep);
        if(creep.carry.energy == 0) {
            var drops = creep.room.find(FIND_DROPPED_ENERGY);
            if(drops.length) {
                if(creep.pickup(drops[0])==ERR_NOT_IN_RANGE) {
                    creep.moveTo(drops[0], {ignoreRoads: true});//carriers move the same speed on and off road, speed up the search
                }
            }
        } else {
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
                                    structure.structureType == STRUCTURE_SPAWN ||
                                    structure.structureType == STRUCTURE_STORAGE) && structure.energy < structure.energyCapacity;
                        }
                });
                targets = _.sortBy(targets, function(x) {
                  return creep.pos.getRangeTo(x.pos);
                });
                creep.memory.targetID = targets[0].id;
            }
        }
    }
};

module.exports = roleDistributor;
