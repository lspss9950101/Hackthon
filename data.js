module.exports = {
    appendData: (uuid, uuidSocketMapping, data) => {
        if(!uuidSocketMapping[uuid]) return;
        uuidSocketMapping[uuid].forEach(client => {
            client.emit('updateData', data);
        });
    }
};