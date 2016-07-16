var parent = require('bot')

var roleHarvester = {
    /** @param {Creep} creep **/
    run: function(creep) {
        parent.run(creep);
        var sources = creep.room.find(FIND_SOURCES);
        sources = _.sortBy(sources, function(x) {
            return creep.pos.getRangeTo(x.pos);
        });
        if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0]);
        }
        //TODO:put down a container if there are no containers around
	}
};

module.exports = roleHarvester;