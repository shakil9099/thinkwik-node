const { User } = require('../../../../models')

const controller = {}

controller.register = (req, res) => {
    const body = _.pick(req.body, ['sEmail', 'sPassword'])

    if (!body.sEmail) return res.reply(messages.email_required)
    if (!body.sPassword) return res.reply(messages.password_required)
    if (!_.isEmail(body.sEmail)) return res.reply(messages.invalid_email)

    body.sPassword = _.encryptPassword(body.sPassword)
    User.create(body, (error) => {
        if (error) return res.reply(messages.server_error, error.toString())
        res.reply(messages.success)
    })
}

controller.login = (req, res) => {
    const body = _.pick(req.body, ['sEmail', 'sPassword'])

    if (!body.sEmail) return res.reply(messages.email_required)
    if (!body.sPassword) return res.reply(messages.password_required)
    if (!_.isEmail(body.sEmail)) return res.reply(messages.invalid_email)

    const query = { sEmail: body.sEmail }
    User.findOne(query, (error, user) => {
        if (error) return res.reply(messages.server_error, error.toString())
        if (!user || _.encryptPassword(body.sPassword) !== user.sPassword ) return res.reply(messages.user_not_found)
        user.sToken = _.encodeToken({ _id: user._id })
        user.save(_.errorCallback)
        res.reply(messages.success, {}, { authorization: user.sToken })
    })
}

module.exports = controller
