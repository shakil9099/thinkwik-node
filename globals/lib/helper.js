const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const _ = {}

const config = {
    JWT_SECRET: process.env.JWT_SECRET,
};

_.clone = function (data = {}) {
    const originalData = data.toObject ? data.toObject() : data; // for mongodb result operations
    const eType = originalData ? originalData.constructor : 'normal';
    if (eType === Object) return { ...originalData };
    if (eType === Array) return [...originalData];
    return data;
};

_.pick = function (obj, array) {
    const clonedObj = this.clone(obj);
    return array.reduce((acc, elem) => {
        if (elem in clonedObj) acc[elem] = clonedObj[elem];
        return acc;
    }, {});
};

_.errorCallback = (error, response) => {
    if (error) console.error(error);
};

_.encodeToken = function (body, expTime) {
    try {
        return expTime ? jwt.sign(this.clone(body), config.JWT_SECRET, expTime) : jwt.sign(this.clone(body), config.JWT_SECRET);
    } catch (error) {
        return undefined;
    }
};

_.decodeToken = function (token) {
    try {
        return jwt.decode(token, config.JWT_SECRET);
    } catch (error) {
        return undefined;
    }
};

_.encryptPassword = function (password) {
    return crypto.createHmac('sha256', config.JWT_SECRET).update(password).digest('hex');
};

_.isEmail = function (email) {
    const regeX = /[a-z0-9._%+-]+@[a-z0-9-]+[.]+[a-z]{2,5}$/;
    return regeX.test(email);
};

module.exports = _
