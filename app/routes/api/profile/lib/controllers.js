const messages = require('../../../../../globals/lib/messages')
const { User } = require('../../../../models')

const controller = {}

controller.get = (req, res) => {
    const user = _.pick(req.user, ['sFirstName', 'sLastName', 'sEmail', 'dBirthDate', 'eGender', 'sProPic'])
    res.reply(messages.success, user)
}

controller.update = (req, res) => {
    const body = _.pick(req.body, ['sFirstName', 'sLastName', 'sEmail', 'dBirthDate', 'eGender'])

    const query = { _id: req.user._id }
    const updateQuery = { $set: body }

    User.updateOne(query, updateQuery, (error) => {
        if (error) return res.reply(messages.server_error, error.toString())
        res.reply(messages.success)
    })
}

controller.uploadPic = (req, res) => {
    const query = { _id: req.user._id }
    const updateQuery = { $set: { sProPic: `${process.env.BASE_URL}/${req.file.filename}` } }
    User.updateOne(query, updateQuery, (error) => {
        if (error) return res.reply(messages.server_error, error.toString())
        res.reply(messages.success)
    })
}

module.exports = controller
