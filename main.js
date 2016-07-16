//TODO:make all the stuff be room-independent
//TODO:split distributors into carriers and distributors, try to maintain the perfect carrier number

var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleDistributor = require('role.distributor');
var controlCenter = require('control.center');
var spawnControl = require('spawn.control');

module.exports.loop = function () {
    spawnControl.run();
    controlCenter.run();
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'distributor') {
            roleDistributor.run(creep);
        }
    }
    if(Game.time % 1000 == 0) {
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
    }
}