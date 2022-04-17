const multer = require('multer')

const services = {}

services.uploadProPic = (name) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'seeds')
        },
        filename: function (req, file, cb) {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
          const mimetypearray = file.mimetype.split('/');
          const mimetype = mimetypearray[1];
          cb(null, `${uniqueSuffix}.${mimetype}`)
        }
    })
    return multer({storage}).single(name)
}

module.exports = services
