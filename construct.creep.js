export function autoSpawnCreeps(spawnName) {
    if (Game.creeps.filter(isHarvester) < 2) {
        spawnBasicCreep('harvester');
    }

    else if (Game.creeps.filter(isBuilder) < 1) {
        spawnBasicCreep('builder');
    }

    function spawnBasicCreep(role) {
        const s = Game.spawns[spawnName].spawnCreep(
            ['WORK', 'MOVE', 'CARRY'],
            role + Game.time,
            { memory: { role: role } }
        );

        switch (s) {
            case OK:
                console.log(`Spawning new ${role}`);
                break;
            case ERR_BUSY:
                console.log('Awaiting spawn...');
                break;
            case ERR_NOT_ENOUGH_ENERGY:
                console.log(`Need energy to spawn ${role}!`);
                break;
            default:
                console.log(`Unexpected error while trying to spawn ${role}`);
        }
    }
}


const isHarvester = () => creep.memory.role == 'harvester';
const isBuilder = () => creep.memory.role == 'builder';
