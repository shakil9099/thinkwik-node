const mongoose = require('mongoose')

const Event = mongoose.Schema(
    {
        aParticipant: [mongoose.Schema.Types.ObjectId],
        dScheduledAt: Date, // will store date and time here
        iCreatorId: mongoose.Schema.Types.ObjectId,
        sTitle: String,
        sDescription: String,
        sPlace: String,
        nMaxParticipant: Number
    },
    { timestamps: { createdAt: 'dCreatedDate', updatedAt: 'dUpdatedDate' } }
)

module.exports = mongoose.model('events', Event)
