module.exports = {
    appendData: (uuid, data, uuidSocketMapping) => {
        if(!uuidSocketMapping[uuid]) return;
        uuidSocketMapping[uuid].forEach(client => {
            client.emit('updateData', data);
        });
    }
};