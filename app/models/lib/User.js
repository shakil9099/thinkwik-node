const mongoose = require('mongoose')

const User = mongoose.Schema(
    {
        sFirstName: String,
        sLastName: String,
        sEmail: String,
        sPassword: String,
        sToken: String,
        sProPic: String,
        dBirthDate: Date,
        eGender: {
            type: String,
            enum: ['male', 'female']
        }
    }, 
    { timestamps: { createdAt: 'dCreatedDate', updatedAt: 'dUpdatedDate' } }
)

module.exports = mongoose.model('users', User)
