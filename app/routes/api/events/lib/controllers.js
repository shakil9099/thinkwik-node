const messages = require('../../../../../globals/lib/messages')
const { Event } = require('../../../../models')
const { mongodb } = require('../../../../utils')

const controllers = {}

controllers.create = (req, res) => {
    const body = _.pick(req.body, ['dScheduledAt', 'nMaxParticipant', 'sTitle', 'sDescription', 'sPlace'])

    if (!body.dScheduledAt) return res.reply(messages.field_require('schdule time'))
    if (!body.nMaxParticipant) return res.reply(messages.field_require('Max participant'))
    if (!body.sTitle) return res.reply(messages.field_require('Title'))
    if (!body.sDescription) return res.reply(messages.field_require('Description'))
    if (!body.sPlace) return res.reply(messages.field_require('Place'))
    if (new Date() < new Date(body.dScheduledAt)) return res.reply(messages.invalid_time)

    body.iCreatorId = req.user._id
    Event.create(body, (error) => {
        if (error) return res.reply(messages.server_error, error.toString())
        res.reply(messages.created_succefully('Event'))
    })
}

controllers.join = (req, res) => {
    const { iEventId } = _.pick(req.params, ['iEventId'])
    Event.findById(iEventId, async (error, event) => {
        if (error) return res.reply(messages.server_error, error.toString())
        if (event.aParticipant.includes(req.user._id)) return res.reply(messages.already_join_event)
        if (event.aParticipant.length === event.nMaxParticipant) return res.reply(messages.max_limit_reached)
        if (new Date(event.dScheduledAt) < new Date()) return res.reply(messages.already_started)
        if (event.iCreatorId === req.user._id) return res.reply(messages.creator_join_event)

        event.aParticipant.push(req.user._id)
        await event.save()
        res.reply(messages.success)
    })
}

controllers.list = (req, res) => {
    const query = [
        {
            $match: {
                iCreatorId: { $ne: mongodb.mongify(req.user._id) }
            }
        },
        {
            $lookup: {
                let: { iCreatorId: '$iCreatorId' },
                from: 'users',
                pipeline: [
                    {
                        $match: {
                            $expr: { $eq: ['$$iCreatorId', '$_id'] }
                        }
                    },
                    {
                        $project: {
                            sFirstName: true,
                            sLastName: true,
                            sEmail: true
                        }
                    }
                ],
                as: 'user'
            }
        },
        {
            $unwind: '$user'
        },
        {
            $project: {
                dScheduledAt: true,
                sTitle: true,
                sDescription: true,
                sPlace: true,
                sEmail: '$user.sEmail',
                sFirstName: { $ifNull: ['$user.sFirstName', 'N/A'] }, // not available
                sLastName: { $ifNull: ['$user.sLastName', 'N/A'] }
            }
        }
    ]
    Event.aggregate(query, (error,events) => {
        if (error) return res.reply(messages.server_error, error.toString())
        res.reply(messages.success, events)
    })

}

controllers.leave = (req, res) => {
    const { iEventId } = _.pick(req.params, ['iEventId'])
    Event.updateOne({ _id: iEventId }, { $pull: { aParticipant: req.user._id } }, (error) => {
        if (error) return res.reply(messages.server_error, error.toString())
        res.reply(messages.success)
    })
}

controllers.participants = (req, res) => {
    const { iEventId } = _.pick(req.params, ['iEventId'])
    if (!iEventId) return res.reply(messages.field_require('Event id'))
    const query = [
        {
            $match: {
                _id: mongodb.mongify(iEventId)
            }
        },
        {
            $lookup: {
                let: { aParticipant: '$aParticipant' },
                from: 'users',
                pipeline: [
                    {
                        $match: {
                            $expr: { $in: ['$_id', '$aParticipant'] }
                        }
                    },
                    {
                        $project: {
                            sFirstName: true,
                            sLastName: true,
                            sEmail: true
                        }
                    }
                ],
                as: 'participants'
            }
        },
        {
            $project: {
                participants: true
            }
        }
    ]

    Event.aggregate(query, (error, participants) => {
        if(error) return res.reply(messages.server_error, error.toString())
        res.reply(messages.success, participants)
    })
}

controllers.creatorInfo = (req, res) => {
    const { iEventId } = _.pick(req.params, ['iEventId'])
    if (!iEventId) return res.reply(messages.field_require('Event Id'))

    const query = [
        {
            $match: {
                _id: mongodb.mongify(iEventId)
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'iCreatorId',
                foreignField: '_id',
                as: 'creator'
            }
        },
        {
            $unwind: '$creator'
        },
        {
            sFirstName: '$creator.sFirstName',
            sLastName: '$creator.sLastName',
            sEmail: '$creator.sEmail'
        }
    ]

    Event.aggregate(query, (error, [creator]) => {
        if (error) return res.reply(messages.server_error, error.toString())
        res.reply(messages.success, creator)
    })
}

module.exports = controllers
