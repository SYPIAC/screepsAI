//parent of all screep roles

var spawnControl = require('spawn.control');
var bodies = spawnControl.bodies;

var bot = {
    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.ticksToLive == 50) {
            bot.getReplaced(creep);
            console.log(creep.memory.role + " tries to replace itself.")
        }
    },
    
    getReplaced: function(creep) {
        var role = creep.memory.role;
        var size = 0;
        if(role=='harvester') {
            spawnControl.buildBiggest('harvester', 5);
        } else {
            spawnControl.build(creep.memory.role, Math.ceil(creep.body.length/bodies[creep.memory.role].length));
        }
    }
}

module.exports = bot;