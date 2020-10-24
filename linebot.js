const line = require('@line/bot-sdk');

function init(app) {
    const config = {
        channelAccessToken: 'YOUR_CHANNEL_ACCESS_TOKEN',
        channelSecret: 'YOUR_CHANNEL_SECRET'
    };

    app.post('/api/webhook', line.middleware(config), (req, res) => {
        Promise
            .all(req.body.events.map(handleEvent))
            .then((result) => res.json(result));
    });

    const client = new line.Client(config);
    function handleEvent(event) {
        if (event.type !== 'message' || event.message.type !== 'text') {
            return Promise.resolve(null);
        }

        return client.replyMessage(event.replyToken, {
            type: 'text',
            text: event.message.text
        });
    }
}

module.exports = {
    init: init
};