const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    roomId: {
        type: String,
        required: true,
    },
    hasRead: {
        type: Boolean
    },
});

module.exports = mongoose.model('Message', MessageSchema);

