const messages = {
    created_succefully: (obj) => { return { code: 201, message: `${obj} is created successfully.` } },
    field_require: (field) => { return { code: 400, message: `${field} is required.`} },
    email_required: { code: 400, messages: 'Email is required.' },
    password_required: { code: 400, message: 'Password is required.' },
    invalid_email: { code: 402, message: 'Email is Invalid.' },
    success: { code: 200, message: 'success' },
    server_error: { code: 500, message: 'server error.' },
    user_not_found: { code: 402, message: 'User not found with this credentials.' },
    unauthorized: { code: 401, message: 'Unauthorized request!' },
    invalid_time: { code: 400, message: 'Invalid time.' },
    max_limit_reached: { code: 403, message: 'Can not join event due to max limit reached.' },
    already_started: { code: 403, message: 'Can not join event as event is already started.' },
    creator_join_event: { code: 403, message: 'Creator can not join event.' },
    already_join_event: { code: 403, message: 'Already joined event.' },
}

module.exports = messages
