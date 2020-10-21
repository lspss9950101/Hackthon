const { ContinuousSizeLegend } = require('react-vis');

const uuidSocketMapping = {};
module.exports = {
    init: (server) => {
        const io = require('socket.io').listen(server);
        io.on('connection', client => {
            console.log('New connection.');
            client.on('disconnect', _ => {
                console.log('Disconnected.');
                if(client.boardUUID)
                    uuidSocketMapping[client.boardUUID] = uuidSocketMapping[client.boardUUID].filter(socket => socket.uuid == client.uuid);
            });

            client.on('setUUID', uuid => {
                if(!uuidSocketMapping[uuid])
                    uuidSocketMapping[uuid] = [];
                uuidSocketMapping[uuid].push(client);
                client.boardUUID = uuid;
            });
        });
    },
    uuidSocketMapping: uuidSocketMapping    
}