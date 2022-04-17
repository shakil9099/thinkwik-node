const { User } = require('../../../../models')

const middlewares = {}

middlewares.isAuthenticated = (req, res, next) => {
    const token = req.header('authorization');
    if (!token) return res.reply(messages.unauthorized);

    const decodedToken = _.decodeToken(token);
    if (!decodedToken) return res.reply(messages.unauthorized);

    User.findOne({ _id: decodedToken._id }, (error, user) => {
        if (error) return res.reply(messages.server_error, error.toString())
        if (!user) return res.reply(messages.user_not_found)
        req.user = user
        next()
    }).lean()
}

module.exports = middlewares
